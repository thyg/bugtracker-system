"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Project } from "@/types"

interface ProjectCardProps {
  project: Project
  className?: string
  onClick?: () => void
}

const statusConfig = {
  active: {
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    label: "Actif",
  },
  inactive: {
    icon: XCircle,
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
    label: "Inactif",
  },
  error: {
    icon: AlertTriangle,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    label: "Erreur",
  },
}

// ✅ Ajout d'une config par défaut en cas de statut inconnu ou manquant
const fallbackStatus = {
  icon: AlertTriangle,
  color: "text-yellow-500",
  bgColor: "bg-yellow-500/10",
  label: "Inconnu",
}

export function ProjectCard({ project, className, onClick }: ProjectCardProps) {
  const status = statusConfig[project.status as keyof typeof statusConfig] || fallbackStatus
  const StatusIcon = status.icon

  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-purple-500/50",
        className,
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className={cn("p-2 rounded-lg", status.bgColor)}>
            <StatusIcon className={cn("h-4 w-4", status.color)} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{project.name}</h3>
            <p className="text-sm text-muted-foreground">{project.platform}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Status and metrics */}
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className={status.color}>
              {status.label}
            </Badge>
            <div className="text-right">
              {/**  
              <p className="text-2xl font-bold text-red-500">{project.errorCount}</p>*/}
              <p className="text-xs text-muted-foreground">erreurs</p>
            </div>
          </div>

          {/* Team avatars */}
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {project.team?.slice(0, 3).map((member, index) => (
                <div
                  key={index}
                  className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-2 border-background flex items-center justify-center"
                >
                  <span className="text-xs font-medium text-white">{member.charAt(0).toUpperCase()}</span>
                </div>
              ))}
              {project.team?.length > 3 && (
                <div className="w-8 h-8 bg-muted rounded-full border-2 border-background flex items-center justify-center">
                  <span className="text-xs font-medium">+{project.team.length - 3}</span>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Vu {project.lastSeen ? new Date(project.lastSeen).toLocaleDateString("fr-FR") : "jamais"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
