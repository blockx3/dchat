from fastapi import FastAPI
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

from langchain_community.vectorstores.upstash import UpstashVectorStore
from langchain_mistralai import ChatMistralAI

from langchain_core.messages import HumanMessage     
from langchain_core.chat_history import InMemoryChatMessageHistory

from langchain.chains import create_history_aware_retriever
from langchain_core.prompts import MessagesPlaceholder

from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.messages import AIMessage



load_dotenv()

# Secret keys

secretAPI = os.getenv("MISTRAL_API_KEY")
UPSTASH_REST_URL = os.getenv("UPSTASH_REST_URL")
UPSTASH_REST_TOKEN = os.getenv("UPSTASH_REST_TOKEN")



class Item(BaseModel):
    question: str


app = FastAPI()

# Common variables used in both POST routes

embeddings = HuggingFaceEmbeddings()

store = UpstashVectorStore(
    embedding=embeddings,
    index_token=UPSTASH_REST_TOKEN,
    index_url=UPSTASH_REST_URL
)

history={}

llm = ChatMistralAI(model="mistral-large-latest", api_key=secretAPI)

retriever = store.as_retriever(search_type="similarity", search_kwargs={"k": 6})

# POST routes for storing pdf

@app.post("/storePdf")
async def create_item():

    pdf_files = [
        "./data/news.pdf",
        "./data/one.pdf"
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

    store.add_documents(all_splits)
    
    return {"message": "Successfully PDF loaded"}


# POST routes for Response

@app.post("/getResponse")
async def create_item(item: Item):
    retriever = store.as_retriever(search_type="similarity", search_kwargs={"k": 6})

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


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)