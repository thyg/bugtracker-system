"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TablePagination } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { useApi } from "@/hooks/use-api"
import { issuesApi } from "@/lib/api"
import { AlertTriangle, AlertCircle, Info, Search, Filter, User } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface ProjectIssuesProps {
  projectId: string
}

export function ProjectIssues({ projectId }: ProjectIssuesProps) {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({
    status: "",
    level: "",
  })
  const [searchQuery, setSearchQuery] = useState("")

  const { data, loading, error } = useApi(() =>
    issuesApi.getAll({
      page,
      limit: 10,
      project: projectId,
      status: filters.status || undefined,
      level: filters.level || undefined,
    }),
  )

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPage(1)
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
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

  const filteredIssues = data?.data.filter((issue) =>
    searchQuery ? issue.title.toLowerCase().includes(searchQuery.toLowerCase()) : true,
  )

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Skeleton className="h-10 w-full md:w-64" />
          <Skeleton className="h-10 w-full md:w-40" />
          <Skeleton className="h-10 w-full md:w-40" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Erreur de chargement</h2>
          <p className="text-muted-foreground mb-6">Impossible de charger les issues. Veuillez réessayer plus tard.</p>
          <Button onClick={() => window.location.reload()}>Réessayer</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="unresolved">Non résolu</SelectItem>
            <SelectItem value="resolved">Résolu</SelectItem>
            <SelectItem value="ignored">Ignoré</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.level} onValueChange={(value) => handleFilterChange("level", value)}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Niveau" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les niveaux</SelectItem>
            <SelectItem value="error">Erreur</SelectItem>
            <SelectItem value="warning">Avertissement</SelectItem>
            <SelectItem value="info">Info</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Issues Table */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-lg flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Issues
            <Badge variant="outline" className="ml-2">
              {data.pagination.total}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Événements</TableHead>
                <TableHead>Utilisateurs</TableHead>
                <TableHead>Assigné</TableHead>
                <TableHead>Dernière occurrence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Aucune issue trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredIssues?.map((issue) => (
                  <TableRow
                    key={issue.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => router.push(`/projects/${projectId}/issues/${issue.id}`)}
                  >
                    <TableCell className="font-medium max-w-xs truncate">{issue.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getLevelIcon(issue.level)}
                        <span className="ml-2 capitalize">{issue.level}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(issue.status)}</TableCell>
                    <TableCell>{issue.count}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {issue.userCount}
                      </div>
                    </TableCell>
                    <TableCell>
                      {issue.assignee ? (
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs">
                            {issue.assignee.charAt(0).toUpperCase()}
                          </div>
                          <span className="ml-2">{issue.assignee}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Non assigné</span>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(issue.lastSeen)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {data.pagination.totalPages > 1 && (
            <div className="mt-4">
              <TablePagination
                currentPage={page}
                totalPages={data.pagination.totalPages}
                onPageChange={setPage}
                itemsPerPage={data.pagination.limit}
                totalItems={data.pagination.total}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
