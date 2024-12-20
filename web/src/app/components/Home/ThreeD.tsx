"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import cardImg from "../../../../public/cardImg.jpg"
import { signIn } from "next-auth/react"

export function ThreeD() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-[#1C1A35] relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border border-white">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-white dark:text-white"
        >
          Chat History & File Storage
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-white text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Users can access past chat interactions and view previously uploaded Files anytime.
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={cardImg}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            className="px-4 py-2 rounded-xl text-xs font-normal text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            onClick={() => signIn(undefined,{
              callbackUrl:"/upload"
            })}
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
