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