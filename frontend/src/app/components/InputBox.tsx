"use client";

import { useState } from "react";
import { create } from "../../../actions/user";
import { Loader2 } from "lucide-react";
import { JsonValue } from "@prisma/client/runtime/library";

interface History {
  id: string
  collectionName: string
  conversationObject: JsonValue
}

interface Conversation {
  collectionName: string;
  history: History[]
};

export default function InputBox(props: Conversation) {
  const { collectionName, history } = props;
  const [question, setQuestion] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  // It remove space from question.

  const trimedQuestion= question.trim();
  const trimedContext=context.trim();

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when starting to generate the answer

    const res = await create(trimedQuestion, trimedContext, collectionName);

    if (res) {
      setQuestion("");
      setContext("");
    }

    setLoading(false); // Set loading to false when done
  };

  return (
    <>
      <div className="flex flex-col gap-4 mb-4">
      {
        history.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="bg-blue-100 p-3 rounded-lg">
              {/* @ts-expect-error question */}
              <strong>User:</strong> {item.conversationObject?.question}
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              {/* @ts-expect-error answer */}
              <strong>Chatbot:</strong> {item.conversationObject?.answer}
            </div>
          </div>
        ))
      }
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
        disabled={loading || trimedQuestion === ""} // Disable button while question is empty and loading
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
