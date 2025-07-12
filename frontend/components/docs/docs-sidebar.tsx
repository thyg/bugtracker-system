"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, FileText, Folder } from "lucide-react"
import { cn } from "@/lib/utils"

interface DocsItem {
  id: string
  title: string
  type: "category" | "article"
  children?: DocsItem[]
  badge?: string
}

const docsStructure: DocsItem[] = [
  {
    id: "getting-started",
    title: "Premiers pas",
    type: "category",
    children: [
      { id: "installation", title: "Installation", type: "article" },
      { id: "quick-start", title: "Démarrage rapide", type: "article" },
      { id: "configuration", title: "Configuration", type: "article" },
      { id: "first-project", title: "Premier projet", type: "article" },
    ],
  },
  {
    id: "error-monitoring",
    title: "Surveillance des erreurs",
    type: "category",
    children: [
      { id: "error-tracking", title: "Suivi des erreurs", type: "article" },
      { id: "error-grouping", title: "Groupement d'erreurs", type: "article" },
      { id: "error-alerts", title: "Alertes d'erreurs", type: "article" },
      { id: "error-resolution", title: "Résolution d'erreurs", type: "article" },
    ],
  },
  {
    id: "performance",
    title: "Performance",
    type: "category",
    children: [
      { id: "performance-monitoring", title: "Surveillance des performances", type: "article" },
      { id: "transaction-tracing", title: "Traçage des transactions", type: "article" },
      { id: "performance-alerts", title: "Alertes de performance", type: "article" },
      { id: "optimization", title: "Optimisation", type: "article" },
    ],
  },
  {
    id: "session-replay",
    title: "Session Replay",
    type: "category",
    children: [
      { id: "replay-setup", title: "Configuration", type: "article" },
      { id: "replay-privacy", title: "Confidentialité", type: "article" },
      { id: "replay-analysis", title: "Analyse des sessions", type: "article" },
    ],
  },
  {
    id: "integrations",
    title: "Intégrations",
    type: "category",
    children: [
      { id: "javascript", title: "JavaScript", type: "article", badge: "Populaire" },
      { id: "react", title: "React", type: "article", badge: "Populaire" },
      { id: "vue", title: "Vue.js", type: "article" },
      { id: "angular", title: "Angular", type: "article" },
      { id: "nodejs", title: "Node.js", type: "article", badge: "Populaire" },
      { id: "python", title: "Python", type: "article" },
      { id: "java", title: "Java", type: "article" },
      { id: "php", title: "PHP", type: "article" },
    ],
  },
  {
    id: "api",
    title: "API Reference",
    type: "category",
    children: [
      { id: "rest-api", title: "REST API", type: "article" },
      { id: "webhooks", title: "Webhooks", type: "article" },
      { id: "authentication", title: "Authentification", type: "article" },
      { id: "rate-limiting", title: "Limitation de débit", type: "article" },
    ],
  },
  {
    id: "guides",
    title: "Guides",
    type: "category",
    children: [
      { id: "best-practices", title: "Bonnes pratiques", type: "article" },
      { id: "troubleshooting", title: "Dépannage", type: "article" },
      { id: "migration", title: "Migration", type: "article" },
      { id: "security", title: "Sécurité", type: "article" },
    ],
  },
]

interface DocsSidebarProps {
  searchQuery: string
  selectedArticle: string
  onSelectArticle: (articleId: string) => void
  onClose: () => void
}

export function DocsSidebar({ searchQuery, selectedArticle, onSelectArticle, onClose }: DocsSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["getting-started"]))

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  const filterItems = (items: DocsItem[]): DocsItem[] => {
    if (!searchQuery) return items

    return items
      .map((item) => {
        if (item.type === "category") {
          const filteredChildren = item.children?.filter((child) =>
            child.title.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          if (filteredChildren && filteredChildren.length > 0) {
            return { ...item, children: filteredChildren }
          }
          return null
        } else {
          return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ? item : null
        }
      })
      .filter(Boolean) as DocsItem[]
  }

  const filteredStructure = filterItems(docsStructure)

  const renderItem = (item: DocsItem, level = 0) => {
    if (item.type === "category") {
      const isExpanded = expandedCategories.has(item.id) || !!searchQuery
      const hasChildren = item.children && item.children.length > 0

      return (
        <div key={item.id}>
          <Button
            variant="ghost"
            className={cn("w-full justify-start text-left font-medium", level > 0 && "ml-4", "hover:bg-muted/50")}
            onClick={() => toggleCategory(item.id)}
          >
            <Folder className="mr-2 h-4 w-4" />
            {item.title}
            {hasChildren && (
              <span className="ml-auto">
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </span>
            )}
          </Button>
          {isExpanded && item.children && (
            <div className="ml-4 space-y-1">{item.children.map((child) => renderItem(child, level + 1))}</div>
          )}
        </div>
      )
    } else {
      return (
        <Button
          key={item.id}
          variant="ghost"
          className={cn(
            "w-full justify-start text-left",
            level > 0 && "ml-4",
            selectedArticle === item.id ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => {
            onSelectArticle(item.id)
            onClose()
          }}
        >
          <FileText className="mr-2 h-4 w-4" />
          {item.title}
          {item.badge && (
            <Badge variant="secondary" className="ml-auto text-xs">
              {item.badge}
            </Badge>
          )}
        </Button>
      )
    }
  }

  return (
    <nav className="p-4 space-y-2">
      {filteredStructure.map((item) => renderItem(item))}
      {filteredStructure.length === 0 && searchQuery && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Aucun résultat trouvé pour "{searchQuery}"</p>
        </div>
      )}
    </nav>
  )
}
