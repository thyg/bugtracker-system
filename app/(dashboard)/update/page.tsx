"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"


export default function UserFooter() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()


  return (
    <>
      <div> test mise a jour</div>
    </>
  )
}