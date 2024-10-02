"use server";

import { prisma } from "@/app/lib/prisma";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { auth } from "../auth"

export async function create(question: string, context: string, collectionName: string) {
  
    try {
      const response = await axios.post("http://0.0.0.0:8880/getResponse", {
        question,
        context, 
        collectionName
      });
      await prisma.conversationHistory.create({
        data: {
          collectionName: collectionName,
          conversationObject: {
            question: question,
            answer: response.data.message
          }
        }
      })
      revalidatePath("/chat");
      return response.data.message;
    } catch(e) {
      return e;
    }
}

export async function upload(formData: FormData) {
  try {
    const session = await auth();
    const result = await axios.post(
        "http://0.0.0.0:8880/upload",
        formData,  // Send the formData instead of the file directly
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
    console.log(result.data);
    

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || ""
      }
    });
    console.log(user+" user");
    
    await prisma.collection.create({
      data: {
        CollectionName: result.data.collection_name,
        pdfName: result.data.file_name,
        userID: user?.id as string
      }
    })
    
    revalidatePath("/chat");

    return result.data.collection_name;
    
    } catch (error) {
        console.error("Error uploading file", error);
    }
};

export async function deletePdf(collectionName: string){
  try {
    const result = await axios.delete( "http://0.0.0.0:8880/del", {
      data:{
        collectionName: collectionName
      }
    })

    await prisma.collection.delete({
      where: {
        CollectionName: collectionName
      }
    })
    
    console.log("consolellog "+result);
    
    revalidatePath("/");
    
    return "deleted";
  } catch(error) {
    console.log("Error", error);
    
  }
}