from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
import os
import uvicorn
from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_huggingface import HuggingFaceEmbeddings

from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

from langchain_mistralai import ChatMistralAI

from langchain_core.messages import HumanMessage     
from langchain_core.chat_history import InMemoryChatMessageHistory

from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from fastapi.middleware.cors import CORSMiddleware

from langchain_postgres import PGVector
from langchain_postgres.vectorstores import PGVector
from io import BytesIO
from PyPDF2 import PdfReader
from langchain.schema import Document
import uuid

load_dotenv()

# Secret keys

secretAPI = os.getenv("MISTRAL_API_KEY")

class Item(BaseModel):
    question: str
    collectionName: str
    
class Info(BaseModel):
    collectionName: str

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#DB connection string and collection name

collection_name = os.getenv("collection_name")
connection = os.getenv("connection")  # Uses psycopg3!

# Common variables used in both POST routes

embeddings = HuggingFaceEmbeddings()

def vector_db(collection):
    vector_store = PGVector(
        embeddings=embeddings,
        collection_name=collection,
        connection=connection,
        use_jsonb=True,
    )
    return vector_store

#Post route
def load_pdf_from_bytes(pdf_bytes):
    pdf_file = BytesIO(pdf_bytes)
    pdf_reader = PdfReader(pdf_file)
    return pdf_reader
    

history={}

llm = ChatMistralAI(model="mistral-large-latest", api_key=secretAPI)


# POST routes for Response

@app.post("/getResponse")
async def create_item(item: Item):
    vector_store = vector_db(item.collectionName)
    
    retriever = vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 6})

    system_prompt = (
        "You are an assistant for question-answering tasks. "
        "Use the following pieces of retrieved context to answer "
        "the question. If you don't know the answer, say that you "
        "don't know. Use three sentences maximum and keep the "
        "answer concise."
        "\n\n"
        "{context}"
    )

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            ("human", "{input}"),
        ]
    )


    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)

    response = rag_chain.invoke({"input": item.question})


    return {"message": response["answer"]}

# Post route for chathistory

@app.post("/DynamicHistory")
async def create_item(item: Item):

    def get_session_history(session_id: str) -> BaseChatMessageHistory:
        if session_id not in history:
            history[session_id] = InMemoryChatMessageHistory()
        return history[session_id]
    
    config = {"configurable": {"session_id": "firstchat"}}
    
    model_with_memory=RunnableWithMessageHistory(llm,get_session_history)
    
    res = model_with_memory.invoke([HumanMessage(content=item.question)],config=config).content
    
    return {"message": res}

# POST routes for storing pdf


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
     
    random = uuid.uuid4().hex[:10].upper()
    collection = 'c'+random+'n'
    
    vector_store = vector_db(collection)
    
    # Read the file content
    content = await file.read()
    
    # Load PDF from the file bytes using the load_pdf_from_bytes function
    pdf_reader = load_pdf_from_bytes(content)
    
    for page in pdf_reader.pages:
        text = page.extract_text()
        if text:
            text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
            docs = [Document(page_content=x) for x in text_splitter.split_text(text)]
            vector_store.add_documents(docs)
    
    return {"collection_name": collection}


@app.delete("/del")
async def delete_all_ids(delInfo: Info):
    vector_store = vector_db(delInfo.collectionName)
    vector_store.delete_collection()
    
    return {"message": "Deleted"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8880)