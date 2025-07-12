"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useApi } from "@/hooks/use-api" // ✅ Import du hook
import { projectsApi } from "@/lib/api"
import { ProjectIssues } from "@/components/project/project-issues"
import { ProjectPerformance } from "@/components/project/project-performance"
import { ProjectReleases } from "@/components/project/project-releases"
import { ProjectFeedback } from "@/components/project/project-feedback"
import { AlertTriangle, BarChart3, GitPullRequest, MessageSquare, Settings, Share2 } from "lucide-react"
import Link from "next/link"

export default function ProjectPage() {
  const { id } = useParams() as { id: string }
  const [activeTab, setActiveTab] = useState("performance")
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ✅ Gestion manuelle de l'état pour éviter les boucles
  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await projectsApi.getById(id)
        setProject(response.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadProject()
    }
  }, [id])

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
            <h2 className="text-2xl font-bold mb-2">Erreur de chargement</h2>
            <p className="text-muted-foreground mb-6">
              {error?.message || "Impossible de charger les détails du projet. Veuillez réessayer plus tard."}
            </p>
            <Button onClick={() => window.location.reload()}>Réessayer</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Actif</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactif</Badge>
      case "error":
        return <Badge variant="destructive">Erreur</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Project Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            {getStatusBadge(project.status)}
          </div>
          <p className="text-muted-foreground">
            {project.platform} • Dernière activité: {new Date(project.lastSeen).toLocaleDateString("fr-FR")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Partager
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Paramètres
          </Button>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Erreurs</p>
                <p className="text-2xl font-bold text-destructive">{project.errorCount}</p>
              </div>
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Membres</p>
                <p className="text-2xl font-bold">{project.team.length}</p>
              </div>
              <div className="flex -space-x-2">
                {project.team.slice(0, 3).map((member, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs border-2 border-background"
                  >
                    {member.charAt(0).toUpperCase()}
                  </div>
                ))}
                {project.team.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                    +{project.team.length - 3}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Releases</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <GitPullRequest className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Feedback</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <MessageSquare className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Tabs */}
      {project && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">

            {/* Issues 
            <TabsTrigger value="issues" className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Issues</span>
            </TabsTrigger>
            */}
      
            <TabsTrigger value="performance" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Performance</span>
            </TabsTrigger>
            <TabsTrigger value="releases" className="flex items-center space-x-2">
              <GitPullRequest className="w-4 h-4" />
              <span>Releases</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Feedback</span>
            </TabsTrigger>
          </TabsList>

          {/* <TabsContent value="issues">
            <ProjectIssues projectId={id} project={project} />
          </TabsContent> */}

          <TabsContent value="performance">
            <ProjectPerformance projectId={id} project={project} />
          </TabsContent>

          <TabsContent value="releases">
            <ProjectReleases projectId={id} project={project} />
          </TabsContent>

          <TabsContent value="feedback">
            <ProjectFeedback projectId={id} project={project} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}