
"use client"
import { signOut } from "next-auth/react"
 
export default function SignOut() {
  return <button className="bg-white text-black" onClick={() => signOut({
    callbackUrl: "/"
  })}>SignOut</button>
}
