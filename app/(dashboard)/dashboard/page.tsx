"use client"

import React, { useState, useEffect } from "react";
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsWidget } from "@/components/specific/stats-widget"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertTriangle,
  CheckCircle,
  Users,
  FolderOpen,
  TrendingUp,
  TrendingDown,
  Zap,
  Shield,
  Activity,
  Globe,
  Server,
  BarChart3,
  Eye,
  GitBranch,
  Bell,
} from "lucide-react"
import { useApi } from "@/hooks/use-api"
import { analyticsApi } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { Area, AreaChart, CartesianGrid, XAxis, Bar, BarChart, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shared/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "red",
  },
  mobile: {
    label: "Mobile",
    color: "blue",
  },
} satisfies ChartConfig


// Composants UI avec Tailwind CSS
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
);

const Button = ({ children, variant = "default", size = "default", className = "", onClick, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
  };
  const sizes = {
    sm: "h-8 px-3 text-sm",
    default: "h-10 px-4 py-2",
    lg: "h-12 px-6 py-3",
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    destructive: "bg-red-100 text-red-800",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-600 bg-white",
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Progress = ({ value, className = "" }) => {
  const safeValue = Math.min(100, Math.max(0, value || 0));
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 overflow-hidden ${className}`}>
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
};

const Avatar = ({ children, className = "" }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
    {children}
  </div>
);

const AvatarFallback = ({ children }) => (
  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm font-medium text-gray-600">
    {children}
  </div>
);

// Composant StatsWidget
const StatsWidget = ({ title, value, change, icon: Icon }) => {
  const getChangeColor = (type) => {
    switch (type) {
      case "increase": return "text-green-600";
      case "decrease": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case "increase": return "↗";
      case "decrease": return "↘";
      default: return "→";
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
            {change && (
              <p className={`text-sm flex items-center gap-1 ${getChangeColor(change.type)}`}>
                <span>{getChangeIcon(change.type)}</span>
                <span>{Math.abs(change.value)}% {change.period}</span>
              </p>
            )}
          </div>
          <div className="ml-4">
            <Icon className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Fonction utilitaire pour formater les dates
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Il y a quelques minutes";
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    if (diffInHours < 48) return "Hier";
    return date.toLocaleDateString('fr-FR');
  } catch (error) {
    return "Date invalide";
  }
};

// Hook simulé pour remplacer useApi
const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation d'un appel API
    const timeout = setTimeout(() => {
      setData({
        totalErrors: 1247,
        activeProjects: 8,
        resolvedIssues: 892,
        teamMembers: 12,
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return { data, loading };
};

// Composant principal
function DashboardStats() {
  const { data: stats, loading } = useApi(() => {});

  // Données simulées
  const recentIssues = [
    {
      id: "1",
      title: "TypeError: Cannot read property 'map' of undefined",
      level: "error",
      project: "Web App", 
      count: 45,
      lastSeen: "2024-01-15T10:30:00Z",
      status: "unresolved",
    },
    {
      id: "2",
      title: "Database connection timeout",
      level: "error",
      project: "API Backend",
      count: 23,
      lastSeen: "2024-01-15T09:45:00Z",
      status: "unresolved",
    },
    {
      id: "3",
      title: "Slow API response time",
      level: "warning",
      project: "API Backend",
      count: 156,
      lastSeen: "2024-01-14T16:30:00Z",
      status: "resolved",
    },
  ];

  const recentDeployments = [
    {
      id: "1",
      version: "v2.1.0",
      project: "Web App",
      status: "success",
      deployedAt: "2024-01-15T08:30:00Z",
      author: "Alice Johnson",
    },
    {
      id: "2",
      version: "v1.8.2",
      project: "API Backend",
      status: "success",
      deployedAt: "2024-01-14T14:20:00Z",
      author: "Bob Smith",
    },
    {
      id: "3",
      version: "v3.0.1",
      project: "Mobile App",
      status: "failed",
      deployedAt: "2024-01-14T11:15:00Z",
      author: "Charlie Davis",
    },
  ];

  const teamActivity = [
    {
      user: "Alice Johnson",
      action: "Resolved issue",
      target: "TypeError in UserList component",
      time: "2024-01-15T10:30:00Z",
    },
    {
      user: "Bob Smith",
      action: "Deployed",
      target: "API Backend v1.8.2",
      time: "2024-01-14T14:20:00Z",
    },
    {
      user: "Charlie Davis",
      action: "Created alert",
      target: "High error rate notification",
      time: "2024-01-14T11:15:00Z",
    },
  ];

  const systemHealth = [
    { name: "API Uptime", value: 99.9, status: "healthy" },
    { name: "Database", value: 98.5, status: "healthy" },
    { name: "CDN", value: 99.8, status: "healthy" },
    { name: "Cache", value: 95.2, status: "warning" },
  ];

  const topProjects = [
    { name: "Web Application", errors: 186, trend: "down", change: -12 },
    { name: "API Backend", errors: 89, trend: "up", change: 8 },
    { name: "Mobile App", errors: 34, trend: "down", change: -5 },
    { name: "Analytics Service", errors: 12, trend: "stable", change: 0 },
  ];

  // Fonctions utilitaires
  const getLevelIcon = (level) => {
    switch (level) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "unresolved":
        return <Badge variant="destructive">Non résolu</Badge>;
      case "resolved":
        return <Badge variant="secondary">Résolu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDeploymentStatus = (status) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Succès</Badge>;
      case "failed":
        return <Badge variant="destructive">Échec</Badge>;
      case "pending":
        return <Badge variant="secondary">En cours</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getHealthProgressColor = (status) => {
    switch (status) {
      case "healthy":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Stats principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsWidget
            title="Erreurs totales"
            value={stats.totalErrors}
            change={{ value: 12, type: "decrease", period: "semaine dernière" }}
            icon={AlertTriangle}
          />
          <StatsWidget
            title="Projets actifs"
            value={stats.activeProjects}
            change={{ value: 8, type: "increase", period: "mois dernier" }}
            icon={FolderOpen}
          />
          <StatsWidget
            title="Issues résolues"
            value={stats.resolvedIssues}
            change={{ value: 23, type: "increase", period: "semaine dernière" }}
            icon={CheckCircle}
          />
          <StatsWidget
            title="Membres d'équipe"
            value={stats.teamMembers}
            change={{ value: 0, type: "neutral", period: "mois dernier" }}
            icon={Users}
          />
        </div>

        {/* Stats secondaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsWidget
            title="Temps de réponse moyen"
            value="156ms"
            change={{ value: 8, type: "decrease", period: "dernière heure" }}
            icon={Zap}
          />
          <StatsWidget
            title="Uptime"
            value="99.9%"
            change={{ value: 0.1, type: "increase", period: "ce mois" }}
            icon={Activity}
          />
          <StatsWidget
            title="Sessions actives"
            value="1,245"
            change={{ value: 15, type: "increase", period: "maintenant" }}
            icon={Eye}
          />
          <StatsWidget
            title="Déploiements"
            value="12"
            change={{ value: 3, type: "increase", period: "cette semaine" }}
            icon={GitBranch}
          />
        </div>

        {/* Section des graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Graphique 1: Évolution des erreurs */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                Évolution des erreurs
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Suivi temporel des erreurs par plateforme
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80 w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      top: 20,
                      left: 12,
                      right: 20,
                      bottom: 12,
                    }}
                  >
                    <CartesianGrid 
                      vertical={false} 
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                    />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={12}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={12}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      tickCount={5}
                    />
                    <ChartTooltip 
                      cursor={{ strokeDasharray: "3 3" }} 
                      content={<ChartTooltipContent className="bg-white shadow-lg border rounded-lg" />} 
                    />
                    <defs>
                      <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area
                      dataKey="mobile"
                      type="monotone"
                      fill="url(#colorMobile)"
                      stroke="var(--color-mobile)"
                      strokeWidth={2}
                      stackId="a"
                    />
                    <Area
                      dataKey="desktop"
                      type="monotone"
                      fill="url(#colorDesktop)"
                      stroke="var(--color-desktop)"
                      strokeWidth={2}
                      stackId="a"
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
              
              {/* Légende personnalisée */}
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm font-medium text-gray-700">Desktop</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium text-gray-700">Mobile</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Graphique 2: Répartition des performances */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Server className="h-5 w-5 text-green-600" />
                </div>
                Répartition des performances
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Comparaison des performances par plateforme
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80 w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <BarChart 
                    accessibilityLayer 
                    data={chartData}
                    margin={{
                      top: 20,
                      left: 12,
                      right: 20,
                      bottom: 12,
                    }}
                  >
                    <CartesianGrid 
                      vertical={false} 
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                    />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={12}
                      axisLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                      content={<ChartTooltipContent 
                        indicator="dashed" 
                        className="bg-white shadow-lg border rounded-lg"
                      />}
                    />
                    <Bar 
                      dataKey="desktop" 
                      fill="var(--color-desktop)" 
                      radius={[6, 6, 0, 0]}
                      maxBarSize={40}
                    />
                    <Bar 
                      dataKey="mobile" 
                      fill="var(--color-mobile)" 
                      radius={[6, 6, 0, 0]}
                      maxBarSize={40}
                    />
                  </BarChart>
                </ChartContainer>
              </div>
              
              {/* Statistiques rapides */}
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">85%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Desktop</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">92%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Mobile</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section détaillée */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Issues récentes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Issues récentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentIssues.map((issue) => (
                <div key={issue.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="mt-1">{getLevelIcon(issue.level)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{issue.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{issue.project}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{issue.count} occurrences</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      {getStatusBadge(issue.status)}
                      <span className="text-xs text-gray-500">{formatDate(issue.lastSeen)}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                Voir toutes les issues
              </Button>
            </CardContent>
          </Card>

          {/* Santé du système */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Santé du système
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemHealth.map((system, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{system.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{system.value}%</span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          system.status === "healthy"
                            ? "bg-green-500"
                            : system.status === "warning"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getHealthProgressColor(system.status)}`}
                      style={{ width: `${system.value}%` }}
                    />
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                Voir le statut détaillé
              </Button>
            </CardContent>
          </Card>

          {/* Projets les plus actifs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                Projets les plus actifs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topProjects.map((project, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{project.name}</p>
                    <p className="text-xs text-gray-500">{project.errors} erreurs</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.trend === "up" && <TrendingUp className="h-4 w-4 text-red-500" />}
                    {project.trend === "down" && <TrendingDown className="h-4 w-4 text-green-500" />}
                    {project.trend === "stable" && <div className="w-4 h-4" />}
                    <span
                      className={`text-xs font-medium ${
                        project.trend === "up"
                          ? "text-red-500"
                          : project.trend === "down"
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      {project.change > 0 ? "+" : ""}
                      {project.change}%
                    </span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                Voir tous les projets
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Section activité */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Déploiements récents */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Déploiements récents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentDeployments.map((deployment) => (
                <div
                  key={deployment.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{deployment.version}</span>
                      {getDeploymentStatus(deployment.status)}
                    </div>
                    <p className="text-xs text-gray-500">{deployment.project}</p>
                    <p className="text-xs text-gray-500">par {deployment.author}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{formatDate(deployment.deployedAt)}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                Voir l'historique complet
              </Button>
            </CardContent>
          </Card>

          {/* Activité de l'équipe */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Activité de l'équipe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-gray-500"> {activity.action} </span>
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500">{formatDate(activity.time)}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                Voir toute l'activité
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground">Vue d'ensemble de vos applications et projets</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/alertes">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Alertes
              </Button>
            </Link>
            <Button size="sm">
              <Globe className="h-4 w-4 mr-2" />
              Voir le statut public
            </Button>
          </div>
        </div>
      </div>
      <DashboardStats />
    </div>
  )
}
