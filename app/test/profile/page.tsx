
"use client"

// page des problemes avec la structure reelle du backend
// prete pour l'integration directe

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Search,
  Filter,
  User,
  Clock,
  ChevronRight,
  BarChart3,
  RefreshCw,
  Bug,
  Server,
} from "lucide-react"
import { formatDate } from "@/lib/utils"

// Interface adaptée à votre structure de données backend
interface LogEntry {
  projectKey: string
  timestamp: string
  level: "ERROR" | "WARN" | "INFO"
  message: string
  platform: string
  exception?: {
    type: string
    value: string
    stacktrace: Array<{
      filename: string
      function: string
      lineno: number
      module: string
    }>
  }
  contexts: {
    os: {
      name: string
      version: string
    }
    runtime: {
      name: string
      version: string
    }
  }
  tags: {
    agent: string
    version: string
    [key: string]: string
  }
}

// Interface pour l'affichage groupé des issues
interface Issue {
  id: string
  title: string
  message: string
  level: "ERROR" | "WARN" | "INFO"
  platform: string
  exceptionType?: string
  count: number
  firstSeen: string
  lastSeen: string
  latestEntry: LogEntry
}

export default function IssuesPage() {
  const router = useRouter()
  const { id } = useParams() as { id: string }
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [sortBy, setSortBy] = useState("lastSeen")
  
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Données simulées basées sur votre structure
  const mockLogEntries: LogEntry[] = [
    {
      projectKey: "VOTRE_CLÉ_DE_PROJET",
      timestamp: "2025-07-01T12:00:00.000Z",
      level: "ERROR",
      message: "Cannot invoke \"String.length()\" because \"s\" is null",
      platform: "java",
      exception: {
        type: "java.lang.NullPointerException",
        value: "Cannot invoke \"String.length()\" because \"s\" is null",
        stacktrace: [
          {
            filename: "UserService.java",
            function: "validateUsername",
            lineno: 42,
            module: "com.mycompany.myapp.UserService"
          },
          {
            filename: "AuthController.java",
            function: "register",
            lineno: 128,
            module: "com.mycompany.myapp.AuthController"
          }
        ]
      },
      contexts: {
        os: {
          name: "Linux",
          version: "5.15.0-76-generic"
        },
        runtime: {
          name: "Eclipse Adoptium",
          version: "17.0.15"
        }
      },
      tags: {
        agent: "bugtracker-hybrid",
        version: "1.0.0",
        environment: "production"
      }
    },
    {
      projectKey: "VOTRE_CLÉ_DE_PROJET",
      timestamp: "2025-07-01T11:45:00.000Z",
      level: "ERROR",
      message: "Connection timeout after 30 seconds",
      platform: "java",
      exception: {
        type: "java.net.SocketTimeoutException",
        value: "Read timed out",
        stacktrace: [
          {
            filename: "DatabaseConnection.java",
            function: "executeQuery",
            lineno: 156,
            module: "com.mycompany.myapp.DatabaseConnection"
          }
        ]
      },
      contexts: {
        os: {
          name: "Linux",
          version: "5.15.0-76-generic"
        },
        runtime: {
          name: "Eclipse Adoptium",
          version: "17.0.15"
        }
      },
      tags: {
        agent: "bugtracker-hybrid",
        version: "1.0.0",
        environment: "production",
        service: "database"
      }
    },
    {
      projectKey: "VOTRE_CLÉ_DE_PROJET",
      timestamp: "2025-07-01T11:30:00.000Z",
      level: "WARN",
      message: "Deprecated method called: getUserById()",
      platform: "java",
      contexts: {
        os: {
          name: "Linux",
          version: "5.15.0-76-generic"
        },
        runtime: {
          name: "Eclipse Adoptium",
          version: "17.0.15"
        }
      },
      tags: {
        agent: "bugtracker-hybrid",
        version: "1.0.0",
        environment: "production",
        deprecated: "true"
      }
    }
  ]

  // Fonction pour grouper les logs en issues
  const groupLogsIntoIssues = (logs: LogEntry[]): Issue[] => {
    const grouped = new Map<string, Issue>()

    logs.forEach(log => {
      // Créer une clé unique basée sur le message et le type d'exception
      const key = log.exception?.type 
        ? `${log.exception.type}-${log.message}`
        : `${log.level}-${log.message}`

      if (grouped.has(key)) {
        const existing = grouped.get(key)!
        existing.count++
        existing.lastSeen = log.timestamp
        existing.latestEntry = log
      } else {
        grouped.set(key, {
          id: key.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(),
          title: log.exception?.type || log.message,
          message: log.message,
          level: log.level,
          platform: log.platform,
          exceptionType: log.exception?.type,
          count: 1,
          firstSeen: log.timestamp,
          lastSeen: log.timestamp,
          latestEntry: log
        })
      }
    })

    return Array.from(grouped.values())
  }

  // Charger les données au montage du composant
  useEffect(() => {
    const groupedIssues = groupLogsIntoIssues(mockLogEntries)
    setIssues(groupedIssues)
  }, [])

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "ERROR":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "WARN":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "INFO":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return null
    }
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "ERROR":
        return <Badge variant="destructive">Erreur</Badge>
      case "WARN":
        return <Badge variant="secondary">Avertissement</Badge>
      case "INFO":
        return <Badge variant="outline">Information</Badge>
      default:
        return <Badge>{level}</Badge>
    }
  }

  const getPlatformBadge = (platform: string) => {
    return <Badge variant="outline" className="flex items-center gap-1">
      <Server className="h-3 w-3" />
      {platform}
    </Badge>
  }

  // Filtrage et tri des issues
  const filteredIssues = issues
    .filter((issue) => {
      const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           issue.message.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesLevel = levelFilter === "all" || issue.level === levelFilter
      const matchesPlatform = platformFilter === "all" || issue.platform === platformFilter
      return matchesSearch && matchesLevel && matchesPlatform
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "count":
          return b.count - a.count
        case "firstSeen":
          return new Date(b.firstSeen).getTime() - new Date(a.firstSeen).getTime()
        case "lastSeen":
        default:
          return new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
      }
    })

  const handleIssueClick = (issueId: string) => {
    router.push(`/issues/${issueId}`)
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
            <h2 className="text-2xl font-bold mb-2">Erreur de chargement</h2>
            <p className="text-muted-foreground mb-6">
              Impossible de charger la liste des issues. Veuillez réessayer plus tard.
            </p>
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Statistiques rapides
  const stats = {
    total: issues.length,
    errors: issues.filter(i => i.level === "ERROR").length,
    warnings: issues.filter(i => i.level === "WARN").length,
    info: issues.filter(i => i.level === "INFO").length,
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Issues</h1>
          <p className="text-muted-foreground">
            Gérez et suivez les erreurs de votre application
          </p>
        </div>
        <Button onClick={() => window.location.reload()} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Actualiser
        </Button>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Erreurs</p>
                <p className="text-2xl font-bold text-red-600">{stats.errors}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avertissements</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.warnings}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Informations</p>
                <p className="text-2xl font-bold text-blue-600">{stats.info}</p>
              </div>
              <Info className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une issue..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full md:w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les niveaux</SelectItem>
                <SelectItem value="ERROR">Erreurs</SelectItem>
                <SelectItem value="WARN">Avertissements</SelectItem>
                <SelectItem value="INFO">Informations</SelectItem>
              </SelectContent>
            </Select>
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Plateforme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les plateformes</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lastSeen">Dernière occurrence</SelectItem>
                <SelectItem value="firstSeen">Première occurrence</SelectItem>
                <SelectItem value="count">Nombre d'occurrences</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des issues */}
      <div className="space-y-4">
        {filteredIssues.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucune issue trouvée</h3>
              <p className="text-muted-foreground">
                {searchQuery || levelFilter !== "all" || platformFilter !== "all"
                  ? "Essayez de modifier vos filtres de recherche."
                  : "Aucune issue n'a été détectée pour le moment."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredIssues.map((issue) => (
            <Card
              key={issue.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleIssueClick(issue.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      {getLevelIcon(issue.level)}
                      <h3 className="font-semibold text-lg">{issue.title}</h3>
                      {getLevelBadge(issue.level)}
                      {getPlatformBadge(issue.platform)}
                      {issue.exceptionType && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Bug className="h-3 w-3" />
                          {issue.exceptionType.split('.').pop()}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{issue.message}</p>
                    
                    {/* Informations contextuelles */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <AlertTriangle className="mr-1 h-4 w-4" />
                        {issue.count} occurrence{issue.count > 1 ? "s" : ""}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        Dernière: {formatDate(issue.lastSeen)}
                      </div>
                      {issue.latestEntry.contexts.runtime && (
                        <div className="flex items-center">
                          <Server className="mr-1 h-4 w-4" />
                          {issue.latestEntry.contexts.runtime.name} {issue.latestEntry.contexts.runtime.version}
                        </div>
                      )}
                    </div>

                    {/* Stack trace preview si disponible */}
                    {issue.latestEntry.exception?.stacktrace && (
                      <div className="mt-3 p-3 bg-muted rounded-md">
                        <p className="text-sm font-medium mb-2">Stack trace:</p>
                        <div className="text-xs font-mono text-muted-foreground space-y-1">
                          {issue.latestEntry.exception.stacktrace.slice(0, 2).map((frame, idx) => (
                            <div key={idx}>
                              <span className="text-foreground">{frame.module}</span>.
                              <span className="text-blue-600">{frame.function}</span>
                              (<span className="text-orange-600">{frame.filename}:{frame.lineno}</span>)
                            </div>
                          ))}
                          {issue.latestEntry.exception.stacktrace.length > 2 && (
                            <div className="text-muted-foreground">
                              ... {issue.latestEntry.exception.stacktrace.length - 2} autres frames
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground ml-4" />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Résultats */}
      {filteredIssues.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Affichage de {filteredIssues.length} issue{filteredIssues.length > 1 ? "s" : ""} sur {issues.length} au total
        </div>
      )}
    </div>
  )
}

