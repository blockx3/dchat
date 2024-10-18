"use client";

import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function SetApi() {
  const [apikey, setApiKey] = useState("");
  const {toast} = useToast();
  function onSubmit() {
    toast({
      title: "API Key Set"
    })
    localStorage.setItem("apikey", apikey);
  }
  return (
    <div className="flex justify-center">
      <form className="flex gap-2 items-center" onSubmit={onSubmit}>
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
    </div>
  );
}
