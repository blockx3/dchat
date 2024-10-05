
"use client"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
 
export default function SignIn() {
  return <Button className="bg-blue-500 hover:bg-blue-700 text-4xl p-7 rounded-3xl" onClick={() => signIn(undefined,{
    callbackUrl:"/home"
  })}>Signin</Button>
}
