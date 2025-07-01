"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { GitPullRequest, GitCommit, Calendar, Package, ArrowRight } from "lucide-react"

interface ProjectReleasesProps {
  projectId: string
}

export function ProjectReleases({ projectId }: ProjectReleasesProps) {
  // Données simulées pour les releases
  const releases = [
    {
      id: "1",
      version: "v2.1.0",
      date: "2024-01-15T10:30:00Z",
      author: "Alice Johnson",
      commits: 24,
      status: "deployed",
      description: "Ajout de nouvelles fonctionnalités et corrections de bugs",
    },
    {
      id: "2",
      version: "v2.0.1",
      date: "2024-01-10T14:45:00Z",
      author: "Bob Smith",
      commits: 8,
      status: "deployed",
      description: "Correctifs de sécurité et optimisations de performance",
    },
    {
      id: "3",
      version: "v2.0.0",
      date: "2024-01-01T09:15:00Z",
      author: "Charlie Davis",
      commits: 56,
      status: "deployed",
      description: "Refonte majeure de l'interface utilisateur et de l'architecture",
    },
    {
      id: "4",
      version: "v1.9.2",
      date: "2023-12-15T16:20:00Z",
      author: "Diana Wilson",
      commits: 12,
      status: "deployed",
      description: "Corrections de bugs et améliorations mineures",
    },
    {
      id: "5",
      version: "v1.9.1",
      date: "2023-12-05T11:10:00Z",
      author: "Evan Taylor",
      commits: 5,
      status: "deployed",
      description: "Correctif pour le problème de connexion",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "deployed":
        return <Badge className="bg-green-500">Déployé</Badge>
      case "pending":
        return <Badge variant="secondary">En attente</Badge>
      case "failed":
        return <Badge variant="destructive">Échec</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Releases</h2>
          <p className="text-muted-foreground">Historique des déploiements et versions</p>
        </div>
        <Button>
          <Package className="mr-2 h-4 w-4" />
          Créer une release
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-lg flex items-center">
            <GitPullRequest className="mr-2 h-5 w-5" />
            Historique des releases
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {releases.map((release, index) => (
              <div key={release.id}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{release.version}</h3>
                      {getStatusBadge(release.status)}
                    </div>
                    <p className="text-muted-foreground">{release.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(release.date).toLocaleDateString("fr-FR")}
                    </div>
                    <div className="flex items-center">
                      <GitCommit className="mr-1 h-4 w-4" />
                      {release.commits} commits
                    </div>
                    <div>par {release.author}</div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="ghost" size="sm" className="text-xs">
                    Voir les détails
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                {index < releases.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
