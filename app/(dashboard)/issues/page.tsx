"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
// import { useApi } from "@/hooks/use-api"
// import { issuesApi } from "@/lib/api"
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
} from "lucide-react"
import { formatDate } from "@/lib/utils"

interface Issue {
  id: string
  title: string
  message: string
  level: "error" | "warning" | "info"
  status: "unresolved" | "resolved" | "ignored"
  count: number
  userCount: number
  firstSeen: string
  lastSeen: string
}

export default function IssuesPage() {
  const router = useRouter()
  const { id } = useParams() as { id: string }
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [sortBy, setSortBy] = useState("lastSeen")
  
  // État local pour éviter les problèmes de rafraîchissement
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Données simulées pour le développement
  const mockIssues: Issue[] = [
    {
      id: "1",
      title: "TypeError: Cannot read property 'map' of undefined",
      message: "Erreur lors du rendu de la liste des utilisateurs",
      level: "error",
      status: "unresolved",
      count: 342,
      userCount: 23,
      firstSeen: "2024-01-10T08:30:00Z",
      lastSeen: "2024-01-15T14:22:00Z",
    },
    {
      id: "2",
      title: "Failed to fetch user data",
      message: "Erreur de connexion à l'API utilisateur",
      level: "error",
      status: "unresolved",
      count: 156,
      userCount: 45,
      firstSeen: "2024-01-12T10:15:00Z",
      lastSeen: "2024-01-15T13:45:00Z",
    },
    {
      id: "3",
      title: "Deprecated API endpoint used",
      message: "Utilisation d'un endpoint obsolète",
      level: "warning",
      status: "resolved",
      count: 89,
      userCount: 12,
      firstSeen: "2024-01-08T16:20:00Z",
      lastSeen: "2024-01-14T09:30:00Z",
    },
    {
      id: "4",
      title: "Slow database query detected",
      message: "Requête de base de données prenant plus de 5 secondes",
      level: "warning",
      status: "unresolved",
      count: 234,
      userCount: 78,
      firstSeen: "2024-01-09T12:00:00Z",
      lastSeen: "2024-01-15T11:15:00Z",
    },
    {
      id: "5",
      title: "User session expired",
      message: "Session utilisateur expirée automatiquement",
      level: "info",
      status: "ignored",
      count: 1205,
      userCount: 234,
      firstSeen: "2024-01-05T09:00:00Z",
      lastSeen: "2024-01-15T14:50:00Z",
    },
  ]

  // Charger les données au montage du composant
  useEffect(() => {
    setIssues(mockIssues)
  }, [])

  const displayIssues = issues.length > 0 ? issues : mockIssues

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unresolved":
        return <Badge variant="destructive">Non résolu</Badge>
      case "resolved":
        return <Badge variant="secondary">Résolu</Badge>
      case "ignored":
        return <Badge variant="outline">Ignoré</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "error":
        return <Badge variant="destructive">Erreur</Badge>
      case "warning":
        return <Badge variant="secondary">Avertissement</Badge>
      case "info":
        return <Badge variant="outline">Information</Badge>
      default:
        return <Badge>{level}</Badge>
    }
  }

  // Filtrage et tri des issues
  const filteredIssues = displayIssues
    .filter((issue) => {
      const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           issue.message.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || issue.status === statusFilter
      const matchesLevel = levelFilter === "all" || issue.level === levelFilter
      return matchesSearch && matchesStatus && matchesLevel
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "count":
          return b.count - a.count
        case "userCount":
          return b.userCount - a.userCount
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
    total: displayIssues.length,
    unresolved: displayIssues.filter(i => i.status === "unresolved").length,
    resolved: displayIssues.filter(i => i.status === "resolved").length,
    ignored: displayIssues.filter(i => i.status === "ignored").length,
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
        <Button onClick={() => refetch?.()} variant="outline">
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
                <p className="text-sm font-medium text-muted-foreground">Non résolues</p>
                <p className="text-2xl font-bold text-red-600">{stats.unresolved}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Résolues</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ignorées</p>
                <p className="text-2xl font-bold text-gray-600">{stats.ignored}</p>
              </div>
              <Info className="h-8 w-8 text-gray-500" />
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="unresolved">Non résolu</SelectItem>
                <SelectItem value="resolved">Résolu</SelectItem>
                <SelectItem value="ignored">Ignoré</SelectItem>
              </SelectContent>
            </Select>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les niveaux</SelectItem>
                <SelectItem value="error">Erreur</SelectItem>
                <SelectItem value="warning">Avertissement</SelectItem>
                <SelectItem value="info">Information</SelectItem>
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
                <SelectItem value="userCount">Utilisateurs affectés</SelectItem>
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
                {searchQuery || statusFilter !== "all" || levelFilter !== "all"
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
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      {getLevelIcon(issue.level)}
                      <h3 className="font-semibold text-lg">{issue.title}</h3>
                      {getStatusBadge(issue.status)}
                      {getLevelBadge(issue.level)}
                    </div>
                    <p className="text-muted-foreground">{issue.message}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <AlertTriangle className="mr-1 h-4 w-4" />
                        {issue.count} occurrences
                      </div>
                      <div className="flex items-center">
                        <User className="mr-1 h-4 w-4" />
                        {issue.userCount} utilisateurs
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        Dernière: {formatDate(issue.lastSeen)}
                      </div>
                    </div>
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
          Affichage de {filteredIssues.length} issue{filteredIssues.length > 1 ? "s" : ""} sur {displayIssues.length} au total
        </div>
      )}
    </div>
  )
}