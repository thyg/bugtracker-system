"use client"

import React, { useState, useEffect } from "react"
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts"
import { 
  User, Calendar, Target, Trophy, TrendingUp, Activity, 
  Clock, CheckCircle, AlertCircle, Star, Award, Zap 
} from "lucide-react"

import Link from "next/link"

// Données simulées pour l'utilisateur
const userActivityData = [
  { date: "2024-06-01", bugs_reported: 5, bugs_resolved: 3, time_spent: 120 },
  { date: "2024-06-02", bugs_reported: 8, bugs_resolved: 6, time_spent: 180 },
  { date: "2024-06-03", bugs_reported: 3, bugs_resolved: 4, time_spent: 90 },
  { date: "2024-06-04", bugs_reported: 12, bugs_resolved: 8, time_spent: 240 },
  { date: "2024-06-05", bugs_reported: 7, bugs_resolved: 9, time_spent: 160 },
  { date: "2024-06-06", bugs_reported: 15, bugs_resolved: 12, time_spent: 300 },
  { date: "2024-06-07", bugs_reported: 4, bugs_resolved: 5, time_spent: 110 },
  { date: "2024-06-08", bugs_reported: 9, bugs_resolved: 7, time_spent: 200 },
  { date: "2024-06-09", bugs_reported: 6, bugs_resolved: 8, time_spent: 140 },
  { date: "2024-06-10", bugs_reported: 11, bugs_resolved: 10, time_spent: 220 },
  { date: "2024-06-11", bugs_reported: 8, bugs_resolved: 6, time_spent: 170 },
  { date: "2024-06-12", bugs_reported: 13, bugs_resolved: 11, time_spent: 280 },
  { date: "2024-06-13", bugs_reported: 5, bugs_resolved: 7, time_spent: 130 },
  { date: "2024-06-14", bugs_reported: 10, bugs_resolved: 9, time_spent: 210 },
]

const severityData = [
  { name: "Critique", value: 15, color: "#ef4444" },
  { name: "Élevée", value: 35, color: "#f97316" },
  { name: "Moyenne", value: 85, color: "#eab308" },
  { name: "Faible", value: 120, color: "#22c55e" },
]

const categoryData = [
  { category: "Frontend", count: 45, resolved: 38 },
  { category: "Backend", count: 32, resolved: 28 },
  { category: "Database", count: 18, resolved: 16 },
  { category: "API", count: 28, resolved: 24 },
  { category: "UI/UX", count: 22, resolved: 19 },
  { category: "Performance", count: 15, resolved: 13 },
]

const weeklyData = [
  { week: "Sem 1", productivity: 75, quality: 85, efficiency: 80 },
  { week: "Sem 2", productivity: 82, quality: 78, efficiency: 85 },
  { week: "Sem 3", productivity: 78, quality: 88, efficiency: 82 },
  { week: "Sem 4", productivity: 88, quality: 92, efficiency: 90 },
]

export default function UserStatistics() {
  const [timeRange, setTimeRange] = useState("14d")
  const [selectedMetric, setSelectedMetric] = useState("bugs_reported")
  const [isLoading, setIsLoading] = useState(true)

  // Simulation de chargement
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Calculs des métriques utilisateur
  const totalBugsReported = userActivityData.reduce((sum, item) => sum + item.bugs_reported, 0)
  const totalBugsResolved = userActivityData.reduce((sum, item) => sum + item.bugs_resolved, 0)
  const totalTimeSpent = userActivityData.reduce((sum, item) => sum + item.time_spent, 0)
  const resolutionRate = Math.round((totalBugsResolved / totalBugsReported) * 100)
  const avgTimePerBug = Math.round(totalTimeSpent / totalBugsResolved)

  const userStats = [
    {
      title: "Bugs Signalés",
      value: totalBugsReported,
      icon: AlertCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "+15%",
      description: "Total bugs identifiés"
    },
    {
      title: "Bugs Résolus",
      value: totalBugsResolved,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "+22%",
      description: "Problèmes corrigés"
    },
    {
      title: "Taux de Résolution",
      value: `${resolutionRate}%`,
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "+8%",
      description: "Efficacité globale"
    },
    {
      title: "Temps Moyen",
      value: `${avgTimePerBug}min`,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "-12%",
      description: "Par résolution"
    },
    {
      title: "Score Qualité",
      value: "4.8/5",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      trend: "+5%",
      description: "Évaluation moyenne"
    },
    {
      title: "Niveau Expert",
      value: "Avancé",
      icon: Award,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      trend: "↗️",
      description: "Progression continue"
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de vos statistiques...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête Utilisateur */}
        <div className="mb-12">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Vos Statistiques Personnelles
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  Tableau de bord de vos performances et contributions
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Membre depuis 2 ans
                  </span>
                  <span className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    Top Contributeur
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    Dernière activité: Aujourd'hui
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Métriques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
          {userStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    stat.trend.includes('+') || stat.trend.includes('↗') ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            )
          })}
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Graphique Linéaire - Activité dans le temps */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Activité Quotidienne</h3>
                <p className="text-gray-600">Évolution de vos contributions</p>
              </div>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="bugs_reported">Bugs Signalés</option>
                <option value="bugs_resolved">Bugs Résolus</option>
                <option value="time_spent">Temps Passé</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString("fr-FR", { month: "short", day: "numeric" })}
                    stroke="#64748b" 
                    fontSize={12}
                  />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString("fr-FR")}
                    contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey={selectedMetric} 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Graphique Circulaire - Répartition par Sévérité */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Répartition par Sévérité</h3>
              <p className="text-gray-600">Classification de vos signalements</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={40}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {severityData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-700">{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Graphiques secondaires */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Graphique en Barres - Par Catégorie */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Performance par Catégorie</h3>
              <p className="text-gray-600">Signalés vs Résolus par domaine</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="category" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px' }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#3b82f6" name="Signalés" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="resolved" fill="#10b981" name="Résolus" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Graphique Area - Performance Hebdomadaire */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Évolution Hebdomadaire</h3>
              <p className="text-gray-600">Productivité, Qualité et Efficacité</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorProductivity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="productivity"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="url(#colorProductivity)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="quality"
                    stackId="2"
                    stroke="#10b981"
                    fill="url(#colorQuality)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="efficiency"
                    stackId="3"
                    stroke="#f59e0b"
                    fill="url(#colorEfficiency)"
                    strokeWidth={2}
                  />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Résumé et Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Résumé de Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-2xl">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Progression</h4>
                <p className="text-sm text-gray-600 mt-1">Performance en hausse de 18% ce mois</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-2xl">
                <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Objectifs</h4>
                <p className="text-sm text-gray-600 mt-1">85% des objectifs mensuels atteints</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-2xl">
                <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Reconnaissance</h4>
                <p className="text-sm text-gray-600 mt-1">3 badges obtenus cette semaine</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Actions Rapides</h3>
            <div className="space-y-4">
              <Link href="/questions">
              <button className="w-full p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                Signaler un Bug
              </button>
              </Link>
              <button className="w-full p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium">
                Voir Mes Tâches
              </button>
              <Link href="/reports">
              <button className="w-full p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium">
                Rapport Mensuel
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}