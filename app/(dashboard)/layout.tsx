import type React from "react"
import type { Metadata } from "next"
import { Sidebar } from "@/components/layout/sidebar"
import { generateSEOMetadata } from "@/components/SEO"

{/** 
export const metadata: Metadata = {
  title: "Dashboard - BUG-TRACKER",
  description: "Tableau de bord de surveillance d'applications",
}
*/}

export const metadata = generateSEOMetadata({
  title: "Dashboard",
  description: "Tableau de bord de gestion des bugs et projets",
  url: "/dashboard",
})


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
