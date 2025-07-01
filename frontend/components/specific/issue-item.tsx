"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, AlertCircle, Info, MoreHorizontal, User } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Issue } from "@/types"

interface IssueItemProps {
  issue: Issue
  className?: string
  onClick?: () => void
}

const levelConfig = {
  error: {
    icon: AlertTriangle,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
  },
  warning: {
    icon: AlertCircle,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
  },
  info: {
    icon: Info,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
}

const statusConfig = {
  unresolved: { label: "Non résolu", variant: "destructive" as const },
  resolved: { label: "Résolu", variant: "secondary" as const },
  ignored: { label: "Ignoré", variant: "outline" as const },
}

export function IssueItem({ issue, className, onClick }: IssueItemProps) {
  const level = levelConfig[issue.level]
  const status = statusConfig[issue.status]
  const LevelIcon = level.icon

  return (
    <div
      className={cn(
        "group flex items-center space-x-4 p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:border-purple-500/50",
        level.borderColor,
        className,
      )}
      onClick={onClick}
    >
      {/* Level indicator */}
      <div className={cn("p-2 rounded-lg flex-shrink-0", level.bgColor)}>
        <LevelIcon className={cn("h-5 w-5", level.color)} />
      </div>

      {/* Issue content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground truncate">{issue.title}</h4>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{issue.message}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-4">
            <Badge variant={status.variant}>{status.label}</Badge>
            <span className="text-sm text-muted-foreground">{issue.project}</span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <span>{issue.count}</span>
              <span>événements</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{issue.userCount}</span>
            </div>
            {issue.assignee && (
              <div className="flex items-center space-x-1">
                <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">{issue.assignee.charAt(0).toUpperCase()}</span>
                </div>
              </div>
            )}
            <span>{new Date(issue.lastSeen).toLocaleDateString("fr-FR")}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
