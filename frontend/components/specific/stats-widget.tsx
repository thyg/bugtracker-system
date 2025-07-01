"use client"

import type * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsWidgetProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: "increase" | "decrease" | "neutral"
    period: string
  }
  icon: React.ComponentType<{ className?: string }>
  className?: string
}

export function StatsWidget({ title, value, change, icon: Icon, className }: StatsWidgetProps) {
  const getTrendIcon = () => {
    if (!change) return null

    switch (change.type) {
      case "increase":
        return <TrendingUp className="h-3 w-3 text-green-500" />
      case "decrease":
        return <TrendingDown className="h-3 w-3 text-red-500" />
      case "neutral":
        return <Minus className="h-3 w-3 text-gray-500" />
    }
  }

  const getTrendColor = () => {
    if (!change) return ""

    switch (change.type) {
      case "increase":
        return "text-green-500"
      case "decrease":
        return "text-red-500"
      case "neutral":
        return "text-gray-500"
    }
  }

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-lg", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {change && (
              <div className="flex items-center space-x-1 mt-2">
                {getTrendIcon()}
                <span className={cn("text-sm font-medium", getTrendColor())}>
                  {change.value > 0 ? "+" : ""}
                  {change.value}%
                </span>
                <span className="text-sm text-muted-foreground">vs {change.period}</span>
              </div>
            )}
          </div>
          <div className="p-3 bg-purple-500/10 rounded-lg">
            <Icon className="h-6 w-6 text-purple-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
