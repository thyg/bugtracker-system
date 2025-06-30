import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { ThemeProvider } from "@/lib/theme-context"
import { LanguageProvider } from "@/lib/language-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BUG-TRACKER - Surveillance d'applications",
  description: "Plateforme moderne de surveillance et de suivi d'erreurs d'applications"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
