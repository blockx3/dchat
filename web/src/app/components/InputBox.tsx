"use client";

import { useState } from "react";
import { create } from "../../../actions/user";
import { Loader2, Pause } from "lucide-react";
import { JsonValue } from "@prisma/client/runtime/library";
import Image from "next/image";
import logo from "../../../public/logo.png";
import arrow from "../../../public/arrow.png";

interface History {
  id: string;
  collectionName: string;
  conversationObject: JsonValue;
}

interface Conversation {
  collectionName: string;
  history: History[];
  userName: string | null | undefined;
}

interface TempMessage {
  question: string;
  answer: string | null;
}

export default function InputBox(props: Conversation) {
  const { collectionName, history, userName } = props;
  const [question, setQuestion] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [tempHistory, setTempHistory] = useState<TempMessage[]>([]);
  const apikey = localStorage.getItem('apikey');

  // It remove space from question.

  const trimedQuestion = question.trim();
  const trimedContext = context.trim();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();    

    if (trimedQuestion == "") return;

    setTempHistory((prev) => [
      ...prev,
      {
        question: trimedQuestion,
        answer: null,
      },
    ]);

    setLoading(true); // Set loading to true when starting to generate the answer
    
    // check collection in database
    // const findCollection = await prisma.collection.findUnique({
    //   where: {
    //     CollectionName: collectionName
    //   }
    // })
    // console.log(findCollection);
    

    if(collectionName == ""){
      alert("Select collection");
    } else {
      await create(trimedQuestion, trimedContext, collectionName, apikey);
    }

    setTempHistory([]);

    setQuestion("");
    setContext("");    
    setLoading(false); // Set loading to false when done
  };

  return (
    <div className="md:w-3/5">
      {history.length != 0 || tempHistory.length != 0 ? (
        <div className="min-h-screen text-white flex flex-col gap-4 md:gap-10 mb-4 px-3 ">
          {history.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 md:gap-10">
              <div className="flex justify-end">
                <div className="bg-[#27219C] p-3 rounded-[15px] max-w-[75%]">
                  {/* @ts-expect-error question */}
                  {item.conversationObject?.question}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Image src={logo} alt="logo" height={41} width={41} />
                <div className="border border-white p-3 rounded-[15px] max-w-[75%]">
                  {/* @ts-expect-error answer */}
                  {item.conversationObject?.answer}
                </div>
              </div>
            </div>
          ))}
          {tempHistory.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 md:gap-10">
              {/* Display user's question */}
              <div className="flex justify-end">
                <div className="bg-[#27219C] p-3 rounded-[15px] max-w-[75%]">
                  {item.question}
                </div>
              </div>
              {/* Display loading spinner or the answer */}
              <div className="flex items-start gap-2">
                <Image src={logo} alt="logo" height={41} width={41} />
                <div className="border border-white p-3 rounded-[15px] max-w-[75%]">
                  {item.answer === null ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    item.answer
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="pb-10 text-white flex justify-center">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={logo}
              alt="logo"
              height={90}
              width={150}
              className="pt-40"
            />
            <div className="text-2xl">Hello {userName?.split(" ")[0]} !</div>
          </div>
        </div>
      )}

      {/* Input box */}
      <form className="sticky bottom-1" onSubmit={handleSubmit}>
        <div className="relative flex flex-col">
          <input
            onChange={(e) => {
              setQuestion(e.target.value);
              setContext(e.target.value);
            }}
            type="search"
            id="search"
            value={question}
            className=" placeholder-white bg-[#0E0A24] text-white w-full p-4 text-sm border border-gray-300 rounded-xl "
            placeholder="Ask Anything"
            required
          />
          <button
            type="submit"
            disabled={loading || trimedQuestion === ""}
            className="flex items-center text-white absolute end-2.5 bottom-0.5 font-medium rounded-lg text-sm px-4 py-2 "
          >
            {loading ? (
              <div className="text-white flex w-full justify-center gap-2">
                <Pause className="border border-white" />
              </div>
            ) : (
              <div>
                <Image src={arrow} height={40} width={40} alt="arrow" />
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
