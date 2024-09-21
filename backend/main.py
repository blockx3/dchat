from fastapi import FastAPI, File, HTTPException, UploadFile
from pydantic import BaseModel
import os
import uvicorn
from dotenv import load_dotenv

from langchain_community.document_loaders import PyPDFLoader
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


load_dotenv()

# Secret keys

secretAPI = os.getenv("MISTRAL_API_KEY")

class Item(BaseModel):
    question: str

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

connection = "postgresql+psycopg://langchain:langchain@localhost:6024/langchain"  # Uses psycopg3!
collection_name = "my_docs"

# Common variables used in both POST routes

embeddings = HuggingFaceEmbeddings()

vector_store = PGVector(
    embeddings=embeddings,
    collection_name=collection_name,
    connection=connection,
    use_jsonb=True,
)

history={}

llm = ChatMistralAI(model="mistral-large-latest", api_key=secretAPI)

retriever = vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 6})


# POST routes for Response

@app.post("/getResponse")
async def create_item(item: Item):
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
    print(res)
    
    return {"message": res}

# POST routes for storing pdf

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Please upload a PDF file!")

    file_location = f"files/input/{file.filename}"

    # Ensure the directory exists
    os.makedirs(os.path.dirname(file_location), exist_ok=True)

    # Save the file content
    with open(file_location, "wb") as f:
        content = await file.read()  # Read file content asynchronously
        f.write(content)  # Write content to the file
        
    
    pdf_files = [
        file_location
    ]

    # Load all PDFs
    all_docs = []
    for file_path in pdf_files:
        loader = PyPDFLoader(file_path)
        docs = loader.load()
        all_docs.extend(docs)  # Merge all documents into a single list

    # Split the documents
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000, chunk_overlap=200, add_start_index=True
    )
    all_splits = text_splitter.split_documents(all_docs)

    vector_store.add_documents(all_splits)
    
    return {"message": "Successfully PDF loaded"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8880)