import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";

export default function Hero() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-slate-200 to-slate-50 dark:from-neutral-600 dark:to-white text-5xl md:text-7xl lg:text-8xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        dchat <br /> Let&apos;s chat.
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-gray-200 dark:text-neutral-400 text-center">
        dchat is an AI-powered RAG-based chatbot that allows users to upload
        files and ask questions related to their content.
      </p>
    </BackgroundLines>
  );
}
