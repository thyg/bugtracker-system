"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChartComponent, BarChartComponent } from "@/components/ui/chart"
import { useState } from "react"
import { Clock, Zap, Users, Server } from "lucide-react"

interface ProjectPerformanceProps {
  projectId: string
}

export function ProjectPerformance({ projectId }: ProjectPerformanceProps) {
  const [timeRange, setTimeRange] = useState("24h")
  const [activeTab, setActiveTab] = useState("overview")

  // Données simulées pour les graphiques
  const responseTimeData = [
    { time: "00:00", value: 120 },
    { time: "02:00", value: 132 },
    { time: "04:00", value: 100 },
    { time: "06:00", value: 152 },
    { time: "08:00", value: 205 },
    { time: "10:00", value: 179 },
    { time: "12:00", value: 163 },
    { time: "14:00", value: 187 },
    { time: "16:00", value: 145 },
    { time: "18:00", value: 156 },
    { time: "20:00", value: 124 },
    { time: "22:00", value: 110 },
  ]

  const throughputData = [
    { time: "00:00", value: 345 },
    { time: "02:00", value: 278 },
    { time: "04:00", value: 189 },
    { time: "06:00", value: 239 },
    { time: "08:00", value: 576 },
    { time: "10:00", value: 723 },
    { time: "12:00", value: 634 },
    { time: "14:00", value: 842 },
    { time: "16:00", value: 756 },
    { time: "18:00", value: 523 },
    { time: "20:00", value: 432 },
    { time: "22:00", value: 356 },
  ]

  const errorRateData = [
    { time: "00:00", value: 1.2 },
    { time: "02:00", value: 0.8 },
    { time: "04:00", value: 0.5 },
    { time: "06:00", value: 0.7 },
    { time: "08:00", value: 1.5 },
    { time: "10:00", value: 2.1 },
    { time: "12:00", value: 1.8 },
    { time: "14:00", value: 1.2 },
    { time: "16:00", value: 0.9 },
    { time: "18:00", value: 1.1 },
    { time: "20:00", value: 0.7 },
    { time: "22:00", value: 0.6 },
  ]

  const endpointPerformanceData = [
    { name: "/api/users", value: 245 },
    { name: "/api/products", value: 187 },
    { name: "/api/orders", value: 312 },
    { name: "/api/auth", value: 98 },
    { name: "/api/checkout", value: 276 },
  ]

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="web">Web</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="database">Base de données</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1h">Dernière heure</SelectItem>
            <SelectItem value="24h">24 heures</SelectItem>
            <SelectItem value="7d">7 jours</SelectItem>
            <SelectItem value="30d">30 jours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-muted-foreground text-sm font-medium">Temps de réponse moyen</div>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">156 ms</div>
            <div className="text-sm text-green-500 mt-2">-12% vs période précédente</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-muted-foreground text-sm font-medium">Débit</div>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">452 req/min</div>
            <div className="text-sm text-green-500 mt-2">+8% vs période précédente</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-muted-foreground text-sm font-medium">Taux d'erreur</div>
              <Server className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">1.2%</div>
            <div className="text-sm text-red-500 mt-2">+0.3% vs période précédente</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-muted-foreground text-sm font-medium">Utilisateurs actifs</div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">1,245</div>
            <div className="text-sm text-green-500 mt-2">+15% vs période précédente</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Temps de réponse</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChartComponent data={responseTimeData} xKey="time" yKey="value" height={300} color="#8b5cf6" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Débit</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChartComponent data={throughputData} xKey="time" yKey="value" height={300} color="#06b6d4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Taux d'erreur (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChartComponent data={errorRateData} xKey="time" yKey="value" height={300} color="#ef4444" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance par endpoint (ms)</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChartComponent data={endpointPerformanceData} xKey="name" yKey="value" height={300} color="#8b5cf6" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
