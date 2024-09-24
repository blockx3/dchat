"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { create, deletePdf } from "../../../actions/user";
import Link from "next/link";

interface ConversationItem {
  question: string;
  answer: string;
}

export default function Content(collection: {collection: string}) {
  const router = useRouter();
  const collectionName = collection.collection;  
  const [question, setQuestion] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [delLoading, setDelLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when starting to generate the answer

    const res = await create(question, context, collectionName);

    if (res) {
      setConversation([...conversation, { question, answer: res }]);
      setQuestion("");
      setContext("");

      // router.push("/chat");
    }
    setLoading(false); // Set loading to false when done
  };

  const handleDelete = async () => {
    setDelLoading(true);
    
    const res = await deletePdf(collectionName);
    

    if (res) {
      router.push("/");
    }
    setDelLoading(false);
  };

  return (
    <div>
      <div className="flex justify-end">
        <div className="flex flex-col gap-2">
          <button
            onClick={handleDelete}
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete pdf
          </button>
          {delLoading && (
            <div className="flex justify-center mt-4">
              <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          )}
          <Link href={'/'}>
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Upload PDF
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col max-w-2xl mx-auto p-4 bg-[#3C3D37] shadow-lg rounded-xl">
        <div className="flex flex-col gap-4 mb-4">
          {conversation.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="bg-blue-100 p-3 rounded-lg">
                <strong>User:</strong> {item.question}
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <strong>Chatbot:</strong> {item.answer}
              </div>
            </div>
          ))}
        </div>
        <input
          onChange={(e) => {
            setQuestion(e.target.value);
            setContext(e.target.value);
          }}
          value={question}
          type="text"
          id="name"
          className="placeholder-white bg-[#697565] text-white text-sm rounded-xl block w-full p-2.5 mb-2"
          placeholder="Ask anything"
          required
        />
        <button
          className="text-white bg-[#697565] hover:bg-[#ECDFCC] hover:text-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={handleSubmit}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <span>Loading...</span> // Display loading text or spinner
          ) : (
            "Submit"
          )}
        </button>
        {loading && (
          <div className="flex justify-center mt-4">
            <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}
