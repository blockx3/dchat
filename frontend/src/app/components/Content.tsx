"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { create } from "../../../actions/user";

interface ConversationItem {
  question: string;
  answer: string;
}

export default function Content() {
  const router = useRouter();
  const [question, setQuestion] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when starting to generate the answer
    const res = await create(question, context);
    if (res) {
      setConversation([...conversation, { question, answer: res }]);
      setQuestion("");
      setContext("");
      router.push("/");
    }
    setLoading(false); // Set loading to false when done
  };

  return (
    <div className="flex flex-col max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
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
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
        placeholder="Ask anything"
        required
      />
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        onClick={handleSubmit}
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <span>Loading...</span> // Display loading text or spinner
        ) : (
          'Submit'
        )}
      </button>
      {loading && (
        <div className="flex justify-center mt-4">
          <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
