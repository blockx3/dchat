# dchat

dchat is an AI-powered RAG-based chatbot that allows users to upload files and ask questions related to their content. It offers versatile use cases, with a key innovation focused on privacy. Uploaded files are securely handled, ensuring confidentiality. By logging in with a Google account, users can maintain and manage their chat history seamlessly. The chatbot leverages the Mistral AI LLM model, ensuring high-quality responses and efficient processing of user queries.

## Development Setup

### Backend Setup

1. **Clone the Repository**

```bash
https://github.com/blockx3/dchat.git
cd fastapi
```

2. **Environment File**

Create .env file and Copy the contents from .env.example

3. **Run server**
```bash
python main.py
```

### Frontend Setup

```bash
cd web
```

2. **Environment File**

Create .env file and Copy the contents from .env.example

```bash
npm install
npm run dev
```

## Contribution

1. Pick an issue and suggest your solution OR create an issue regarding what better you can add to the project.
2. Start working on the issue and create a branch and open pull request.
3. Once the PR is reviewed and approved, it will be merged to the main branch 💫.

## Tech Stack used

1. Mistral AI for the large language model (LLM)
2. PGVector as the vector database
3. LangChain for integrating AI and retrieval-augmented generation (RAG)
4. FastAPI for the backend
5. Next.js & React for the frontend
6. Shadcn/UI & Tailwind CSS for styling
7. Prisma ORM & PostgreSQL for database management
8. Next-Auth for authentication
9. Docker for containerized deployment

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact:

- **Thinley**: [thinleylama44@gmail.com](mailto:thinleylama44@gmail.com)