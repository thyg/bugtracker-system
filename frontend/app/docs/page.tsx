"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { DocsContent } from "@/components/docs/docs-content"
import { DocsSearch } from "@/components/docs/docs-search"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function DocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArticle, setSelectedArticle] = useState("getting-started")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-80 transform bg-card border-r border-border transition-transform duration-300 ease-in-out lg:relative lg:top-0 lg:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex h-full flex-col">
            {/* Search */}
            <div className="p-6 border-b border-border">
              <DocsSearch value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto">
              <DocsSidebar
                searchQuery={searchQuery}
                selectedArticle={selectedArticle}
                onSelectArticle={setSelectedArticle}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:ml-0">
          {/* Mobile header */}
          <div className="sticky top-16 z-30 flex h-14 items-center gap-4 border-b border-border bg-background px-4 lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold">Documentation</h1>
          </div>

          {/* Content */}
          <div className="container max-w-4xl py-8">
            <DocsContent articleId={selectedArticle} />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
