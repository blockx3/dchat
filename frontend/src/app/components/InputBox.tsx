"use client";

import { useState } from "react";
import { create } from "../../../actions/user";
import { Loader2 } from "lucide-react";

interface ConversationItem {
  question: string;
  answer: string;
}

type Conversation = {
  collectionName: string;
};

export default function InputBox(props: Conversation) {
  const { collectionName } = props;
  const [question, setQuestion] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [conversation, setConversation] = useState<ConversationItem[]>([]);

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when starting to generate the answer

    const res = await create(question, context, collectionName);

    if (res) {
      setConversation([...conversation, { question, answer: res }]);
      setQuestion("");
      setContext("");
    }

    setLoading(false); // Set loading to false when done
  };

  return (
    <>
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
        disabled={loading || question === ""} // Disable button while question is empty and loading
      >
        {loading ? (
          <div className="flex w-full justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          "Submit"
        )}
      </button>
    </>
  );
}
