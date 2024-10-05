
"use client"
import { signOut } from "next-auth/react"
 
export default function SignOut() {
  return <button className="" onClick={() => signOut({
    callbackUrl: "/"
  })}>SignOut</button>
}
