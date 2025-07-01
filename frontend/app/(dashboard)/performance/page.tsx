"use client"

import React, { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Bug, CheckCircle, Clock, TrendingUp, AlertTriangle, Zap } from "lucide-react"

const chartData = [
  { date: "2024-04-01", resolved: 222, detected: 150, pending: 45 },
  { date: "2024-04-02", resolved: 197, detected: 180, pending: 52 },
  { date: "2024-04-03", resolved: 167, detected: 120, pending: 38 },
  { date: "2024-04-04", resolved: 242, detected: 260, pending: 67 },
  { date: "2024-04-05", resolved: 273, detected: 290, pending: 78 },
  { date: "2024-04-06", resolved: 301, detected: 340, pending: 89 },
  { date: "2024-04-07", resolved: 245, detected: 180, pending: 41 },
  { date: "2024-04-08", resolved: 309, detected: 320, pending: 72 },
  { date: "2024-04-09", resolved: 159, detected: 110, pending: 28 },
  { date: "2024-04-10", resolved: 261, detected: 190, pending: 43 },
  { date: "2024-04-11", resolved: 327, detected: 350, pending: 85 },
  { date: "2024-04-12", resolved: 292, detected: 210, pending: 48 },
  { date: "2024-04-13", resolved: 342, detected: 380, pending: 92 },
  { date: "2024-04-14", resolved: 137, detected: 220, pending: 65 },
  { date: "2024-04-15", resolved: 120, detected: 170, pending: 39 },
  { date: "2024-04-16", resolved: 138, detected: 190, pending: 44 },
  { date: "2024-04-17", resolved: 346, detected: 360, pending: 76 },
  { date: "2024-04-18", resolved: 364, detected: 410, pending: 98 },
  { date: "2024-04-19", resolved: 243, detected: 180, pending: 35 },
  { date: "2024-04-20", resolved: 189, detected: 150, pending: 32 },
  { date: "2024-04-21", resolved: 237, detected: 200, pending: 47 },
  { date: "2024-04-22", resolved: 224, detected: 170, pending: 38 },
  { date: "2024-04-23", resolved: 238, detected: 230, pending: 54 },
  { date: "2024-04-24", resolved: 387, detected: 290, pending: 63 },
  { date: "2024-04-25", resolved: 315, detected: 250, pending: 52 },
  { date: "2024-04-26", resolved: 175, detected: 130, pending: 28 },
  { date: "2024-04-27", resolved: 383, detected: 420, pending: 102 },
  { date: "2024-04-28", resolved: 222, detected: 180, pending: 41 },
  { date: "2024-04-29", resolved: 315, detected: 240, pending: 54 },
  { date: "2024-04-30", resolved: 354, detected: 380, pending: 89 },
  { date: "2024-05-01", resolved: 265, detected: 220, pending: 48 },
  { date: "2024-05-02", resolved: 393, detected: 310, pending: 67 },
  { date: "2024-05-03", resolved: 247, detected: 190, pending: 42 },
  { date: "2024-05-04", resolved: 485, detected: 420, pending: 95 },
  { date: "2024-05-05", resolved: 381, detected: 390, pending: 87 },
  { date: "2024-05-06", resolved: 398, detected: 520, pending: 124 },
  { date: "2024-05-07", resolved: 288, detected: 300, pending: 68 },
  { date: "2024-05-08", resolved: 249, detected: 210, pending: 46 },
  { date: "2024-05-09", resolved: 227, detected: 180, pending: 39 },
  { date: "2024-05-10", resolved: 393, detected: 330, pending: 74 },
  { date: "2024-05-11", resolved: 235, detected: 270, pending: 63 },
  { date: "2024-05-12", resolved: 297, detected: 240, pending: 52 },
  { date: "2024-05-13", resolved: 197, detected: 160, pending: 34 },
  { date: "2024-05-14", resolved: 348, detected: 490, pending: 118 },
  { date: "2024-05-15", resolved: 373, detected: 380, pending: 82 },
  { date: "2024-05-16", resolved: 238, detected: 400, pending: 98 },
  { date: "2024-05-17", resolved: 399, detected: 420, pending: 95 },
  { date: "2024-05-18", resolved: 215, detected: 350, pending: 89 },
  { date: "2024-05-19", resolved: 135, detected: 180, pending: 42 },
  { date: "2024-05-20", resolved: 277, detected: 230, pending: 51 },
  { date: "2024-05-21", resolved: 182, detected: 140, pending: 31 },
  { date: "2024-05-22", resolved: 181, detected: 120, pending: 26 },
  { date: "2024-05-23", resolved: 352, detected: 290, pending: 64 },
  { date: "2024-05-24", resolved: 194, detected: 220, pending: 52 },
  { date: "2024-05-25", resolved: 301, detected: 250, pending: 55 },
  { date: "2024-05-26", resolved: 113, detected: 170, pending: 41 },
  { date: "2024-05-27", resolved: 320, detected: 460, pending: 112 },
  { date: "2024-05-28", resolved: 133, detected: 190, pending: 45 },
  { date: "2024-05-29", resolved: 178, detected: 130, pending: 28 },
  { date: "2024-05-30", resolved: 240, detected: 280, pending: 67 },
  { date: "2024-05-31", resolved: 278, detected: 230, pending: 49 },
  { date: "2024-06-01", resolved: 278, detected: 200, pending: 43 },
  { date: "2024-06-02", resolved: 370, detected: 410, pending: 94 },
  { date: "2024-06-03", resolved: 203, detected: 160, pending: 34 },
  { date: "2024-06-04", resolved: 339, detected: 380, pending: 87 },
  { date: "2024-06-05", resolved: 188, detected: 140, pending: 31 },
  { date: "2024-06-06", resolved: 194, detected: 250, pending: 58 },
  { date: "2024-06-07", resolved: 223, detected: 370, pending: 89 },
  { date: "2024-06-08", resolved: 285, detected: 320, pending: 74 },
  { date: "2024-06-09", resolved: 338, detected: 480, pending: 118 },
  { date: "2024-06-10", resolved: 255, detected: 200, pending: 43 },
  { date: "2024-06-11", resolved: 192, detected: 150, pending: 32 },
  { date: "2024-06-12", resolved: 392, detected: 420, pending: 96 },
  { date: "2024-06-13", resolved: 181, detected: 130, pending: 28 },
  { date: "2024-06-14", resolved: 326, detected: 380, pending: 87 },
  { date: "2024-06-15", resolved: 207, detected: 350, pending: 84 },
  { date: "2024-06-16", resolved: 271, detected: 310, pending: 72 },
  { date: "2024-06-17", resolved: 375, detected: 520, pending: 126 },
  { date: "2024-06-18", resolved: 207, detected: 170, pending: 37 },
  { date: "2024-06-19", resolved: 241, detected: 290, pending: 68 },
  { date: "2024-06-20", resolved: 308, detected: 450, pending: 108 },
  { date: "2024-06-21", resolved: 269, detected: 210, pending: 46 },
  { date: "2024-06-22", resolved: 217, detected: 270, pending: 63 },
  { date: "2024-06-23", resolved: 380, detected: 530, pending: 128 },
  { date: "2024-06-24", resolved: 232, detected: 180, pending: 39 },
  { date: "2024-06-25", resolved: 241, detected: 190, pending: 42 },
  { date: "2024-06-26", resolved: 334, detected: 380, pending: 87 },
  { date: "2024-06-27", resolved: 348, detected: 490, pending: 118 },
  { date: "2024-06-28", resolved: 249, detected: 200, pending: 43 },
  { date: "2024-06-29", resolved: 203, detected: 160, pending: 34 },
  { date: "2024-06-30", resolved: 346, detected: 400, pending: 92 },
]

export default function BugTrackerDashboard() {
  const [timeRange, setTimeRange] = useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  // Calculs des métriques
  const latestData = filteredData[filteredData.length - 1]
  const totalResolved = filteredData.reduce((sum, item) => sum + item.resolved, 0)
  const totalDetected = filteredData.reduce((sum, item) => sum + item.detected, 0)
  const averageResolutionTime = Math.round(totalResolved / filteredData.length * 0.85) // Simulation
  const resolutionRate = Math.round((totalResolved / totalDetected) * 100)

  const stats = [
    {
      title: "Bugs Détectés",
      value: totalDetected.toLocaleString(),
      icon: Bug,
      color: "text-red-600",
      bgColor: "bg-red-50",
      trend: "+12%"
    },
    {
      title: "Bugs Résolus",
      value: totalResolved.toLocaleString(),
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "+18%"
    },
    {
      title: "En Attente",
      value: latestData?.pending || 0,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      trend: "-5%"
    },
    {
      title: "Taux de Résolution",
      value: `${resolutionRate}%`,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "+3%"
    },
    {
      title: "Temps Moyen de Résolution",
      value: `${averageResolutionTime}h`,
      icon: Zap,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "-8%"
    },
    {
      title: "Criticité Haute",
      value: Math.round(latestData?.pending * 0.15) || 0,
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "-15%"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6">
            <Bug className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Performances du Bug Tracker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Système de détection et correction des erreurs en temps réel. 
            Analysez l'efficacité, les tendances et optimisez vos processus de développement.
          </p>
        </div>

        {/* Métriques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    stat.trend.startsWith('+') ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Graphique principal */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Évolution des Performances
                </h2>
                <p className="text-gray-600">
                  Visualisation en temps réel de la détection et résolution des bugs
                </p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="7d">7 derniers jours</option>
                  <option value="30d">30 derniers jours</option>
                  <option value="90d">3 derniers mois</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="colorDetected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => {
                      const date = new Date(value)
                      return date.toLocaleDateString("fr-FR", {
                        month: "short",
                        day: "numeric",
                      })
                    }}
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Area
                    type="monotone"
                    dataKey="resolved"
                    stackId="1"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#colorResolved)"
                  />
                  <Area
                    type="monotone"
                    dataKey="detected"
                    stackId="2"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#colorDetected)"
                  />
                  <Area
                    type="monotone"
                    dataKey="pending"
                    stackId="3"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fill="url(#colorPending)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            {/* Légende */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Bugs Résolus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Bugs Détectés</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">En Attente</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section informations supplémentaires */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Points Forts</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Taux de résolution élevé ({resolutionRate}%)</span>
              </li>
              <li className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-purple-500" />
                <span className="text-gray-700">Temps de résolution optimisé</span>
              </li>
              <li className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700">Amélioration continue des performances</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Axes d'Amélioration</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">Réduction des bugs critiques</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-700">Diminution du backlog en attente</span>
              </li>
              <li className="flex items-center gap-3">
                <Bug className="w-5 h-5 text-red-500" />
                <span className="text-gray-700">Prévention proactive des erreurs</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}