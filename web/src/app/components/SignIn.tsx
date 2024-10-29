
"use client"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
 
export default function SignIn() {
  return <Button className="hover:bg-blue-500 bg-[#27219C] text-xl p-2 rounded-xl" onClick={() => signIn(undefined,{
    callbackUrl:"/upload"
  })}>Sign up</Button>
}
