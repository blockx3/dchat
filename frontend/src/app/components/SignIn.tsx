
"use client"
import { signIn } from "next-auth/react"
 
export default function SignIn() {
  return <button onClick={() => signIn(undefined,{
    callbackUrl:"/home"
  })}>Signin</button>
}
