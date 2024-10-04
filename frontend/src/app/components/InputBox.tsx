"use client";

import { useState } from "react";
import { create } from "../../../actions/user";
import { Loader2 } from "lucide-react";
import { JsonValue } from "@prisma/client/runtime/library";
import Image from "next/image";
import logo from "../../../public/logo.png"
import arrow from "../../../public/arrow.png"

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
      <div className="min-h-screen text-white flex flex-col gap-4 mb-4 px-3">
        {
          history.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">

              <div className="flex justify-end">
                <div className="bg-[#27219C] p-3 rounded-[15px] max-w-[75%]">
                  {/* @ts-expect-error question */}
                  {item.conversationObject?.question}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Image 
                  src={logo}
                  alt="logo"
                  height={41}
                  width={41}
                />
                <div className="border border-white p-3 rounded-[15px] max-w-[75%]">
                  {/* @ts-expect-error answer */}
                  {item.conversationObject?.answer}
                </div>
              </div>
            </div>
          ))
        }
      </div>
        
        <div className="p-2 sticky bottom-0">
          <div className="bg-[#0E0A24] flex p-2 rounded-2xl border border-white">
            <input
              onChange={(e) => {
                setQuestion(e.target.value);
                setContext(e.target.value);
              }}
              value={question}
              type="text"
              id="name"
              className="placeholder-white bg-[#0E0A24] text-white text-sm w-full p-2.5 mb-2 resize-none max-h-96 overflow-y-scroll"
              placeholder="Ask anything"
              required
            />
            <button          
              onClick={handleSubmit}
              disabled={loading || trimedQuestion === ""} // Disable button while question is empty and loading
            >
              {loading ? (
                <div className="text-white flex w-full justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                <Image
                  src={arrow}
                  height={40}
                  width={40}
                  alt="arrow"
                />
              )}
            </button>
          </div>  
        </div>
    </>
  );
}
