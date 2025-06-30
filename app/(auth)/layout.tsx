import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentification - BUG-TRACKER",
  description: "Connectez-vous ou créez un compte pour accéder à votre tableau de bord BUG-TRACKER",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-900/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
