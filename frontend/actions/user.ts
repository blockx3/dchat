"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

export async function create(question: string, context: string) {
    try {
      const response = await axios.post("http://0.0.0.0:8000/getResponse", {
        question,
        context
      });
      revalidatePath("/");
      
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
    return result.status;
    
    } catch (error) {
        console.error("Error uploading file", error);
    }
};
