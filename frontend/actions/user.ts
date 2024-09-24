"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

export async function create(question: string, context: string, collectionName: string) {
  
    try {
      const response = await axios.post("http://0.0.0.0:8880/getResponse", {
        question,
        context, 
        collectionName
      });
      revalidatePath("/chat");
      return response.data.message;
    } catch(e) {
      return e;
    }
}

export async function upload(formData: FormData) {
  try {
    const result = await axios.post(
        "http://0.0.0.0:8880/upload",
        formData,  // Send the formData instead of the file directly
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );

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
    console.log("consolellog "+result);
    
    revalidatePath("/");
    
    return "deleted";
  } catch(error) {
    console.log("Error", error);
    
  }
}