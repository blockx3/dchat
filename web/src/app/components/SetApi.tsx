"use client";

import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {useRouter} from "next/navigation";

export default function SetApi() {
  const [apikey, setApiKey] = useState(null as string | null);
  const {toast} = useToast();
  const router = useRouter();

  function onSubmit() {
    toast({
      title: "API Key Set",
    })
    if (apikey) {
      localStorage.setItem("apikey", apikey);
    }
  }
  function removeKey() {
    setApiKey(null)
    localStorage.removeItem("apikey");
    router.refresh();
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-2">
        {
          ! localStorage.getItem("apikey") ? (
            <>
              <div className="text-red-500">*Get your API Key from Mistral AI</div>
              <form className="flex flex-col justify-center gap-2 md:flex" onSubmit={onSubmit}>
                <input
                  onChange={(e) => {
                    setApiKey(e.target.value);
                  }}
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 "
                  placeholder="Mistral API Key"
                  required
                />
                <button className="bg-[#1C1A35] p-2 text-white" type="submit">
                  Submit
                </button>
              </form>
            </>
          ) : (
            <div>
                <button onClick={removeKey} className="bg-[#1C1A35] p-2 text-white" type="submit">
                  Reset API Key
                </button>
            </div>
          )
        }

      </div>
    </div>
  );
}
