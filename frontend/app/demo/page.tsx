
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Bug, 
  Plus, 
  Filter, 
  Search, 
  AlertCircle, CheckCircle, Clock, 
  User, Calendar, Tag, ArrowUp, ArrowDown, Minus,
  Eye, Edit,
  Trash2, MessageSquare,
  BarChart3,
  Users,Zap,
  Target, Bell,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Layout,
  CheckSquare,
  UserPlus,
  Folder,
  TrendingUp,
  Mail,
  Phone,
  Sparkles,
  MousePointer2,
  ZoomIn
} from "lucide-react"
import Link from "next/link"

export default function BugTrackerDemo() {
  const [selectedBug, setSelectedBug] = useState(null)
  const [filter, setFilter] = useState("all")
  const [showNewBugForm, setShowNewBugForm] = useState(false)
  const [currentView, setCurrentView] = useState("list") // list, kanban, dashboard
  const [animationStep, setAnimationStep] = useState(0)
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [hoveredScreenshot, setHoveredScreenshot] = useState(null)
  
  const [newBug, setNewBug] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo"
  })

  const [bugs, setBugs] = useState([
    {
      id: 1,
      title: "Login button not responding on mobile",
      description: "Users report that the login button doesn't work on mobile devices when tapped multiple times quickly.",
      status: "todo",
      priority: "high",
      assignee: "Non assigné",
      created: "2025-06-25",
      labels: ["UI", "Mobile"],
      comments: 3
    },
    {
      id: 2,
      title: "Dashboard loading slowly",
      description: "The dashboard takes more than 5 seconds to load, affecting user experience.",
      status: "in-progress",
      priority: "medium",
      assignee: "Jane Smith",
      created: "2025-06-24",
      labels: ["Performance"],
      comments: 1
    },
    {
      id: 3,
      title: "Email notifications not sent",
      description: "System fails to send email notifications for new bug assignments.",
      status: "done",
      priority: "low",
      assignee: "Mike Johnson",
      created: "2025-06-23",
      labels: ["Email", "Notifications"],
      comments: 5
    }
  ])

  // Animation automatique
  useEffect(() => {
    if (isAnimationPlaying) {
      const interval = setInterval(() => {
        setAnimationStep((prev) => {
          if (prev >= 6) {
            setIsAnimationPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isAnimationPlaying])

  const statusIcons = {
    todo: <AlertCircle className="w-4 h-4 text-red-500" />,
    "in-progress": <Clock className="w-4 h-4 text-yellow-500" />,
    done: <CheckCircle className="w-4 h-4 text-green-500" />
  }

  const priorityIcons = {
    high: <ArrowUp className="w-4 h-4 text-red-500" />,
    medium: <Minus className="w-4 h-4 text-yellow-500" />,
    low: <ArrowDown className="w-4 h-4 text-gray-500" />
  }

  const priorityColors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-gray-100 text-gray-800 border-gray-200"
  }

  const statusColors = {
    todo: "bg-red-100 text-red-800 border-red-200",
    "in-progress": "bg-yellow-100 text-yellow-800 border-yellow-200",
    done: "bg-green-100 text-green-800 border-green-200"
  }

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Création rapide de tickets",
      description: "Créez un ticket en moins de 30 secondes avec notre interface intuitive",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Assignation à des membres",
      description: "Assignez automatiquement les tickets selon les compétences et la charge de travail",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: <Folder className="w-6 h-6" />,
      title: "Gestion par projet",
      description: "Organisez vos bugs par projets avec des permissions granulaires",
      color: "from-green-400 to-teal-500"
    },
    {
      icon: <Tag className="w-6 h-6" />,
      title: "Tags & priorité",
      description: "Système de tags intelligent et priorisation automatique des tickets",
      color: "from-pink-400 to-red-500"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Graphiques et reporting",
      description: "Tableaux de bord en temps réel avec métriques avancées et exportation",
      color: "from-indigo-400 to-purple-500"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Notifications temps réel",
      description: "Restez informé instantanément des changements et mises à jour",
      color: "from-cyan-400 to-blue-500"
    }
  ]

  const screenshots = [
    {
      id: "overview",
      title: "Vue d'ensemble",
      description: "Dashboard principal avec métriques en temps réel",
      image: "🖥️"
    },
    {
      id: "details",
      title: "Détails du ticket",
      description: "Interface complète de gestion des tickets",
      image: "📋"
    },
    {
      id: "filters",
      title: "Filtres de recherche",
      description: "Système de filtrage avancé et recherche intelligente",
      image: "🔍"
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Centre de notifications en temps réel",
      image: "🔔"
    }
  ]

  const animationSteps = [
    "Création d'un nouveau ticket...",
    "Ajout des détails et priorité...",
    "Attribution au développeur John Doe...",
    "Ticket déplacé vers 'En cours'...",
    "Ajout de commentaires et mises à jour...",
    "Ticket marqué comme 'Terminé'...",
    "Animation terminée !"
  ]

  const filteredBugs = filter === "all" ? bugs : bugs.filter(bug => bug.status === filter)

  const handleCreateBug = () => {
    if (newBug.title && newBug.description) {
      const bug = {
        id: bugs.length + 1,
        ...newBug,
        assignee: "Non assigné",
        created: new Date().toISOString().split('T')[0],
        labels: ["Nouveau"],
        comments: 0
      }
      setBugs([bug, ...bugs])
      setNewBug({ title: "", description: "", priority: "medium", status: "todo" })
      setShowNewBugForm(false)
    }
  }

  const startAnimation = () => {
    setAnimationStep(0)
    setIsAnimationPlaying(true)
  }

  const KanbanView = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {["todo", "in-progress", "done"].map((status) => (
        <div key={status} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            {statusIcons[status]}
            <span className="ml-2">
              {status === "todo" ? "À faire" : status === "in-progress" ? "En cours" : "Terminé"}
            </span>
            <span className="ml-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
              {bugs.filter(b => b.status === status).length}
            </span>
          </h3>
          <div className="space-y-3">
            {bugs.filter(bug => bug.status === status).map((bug) => (
              <div key={bug.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{bug.title}</h4>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[bug.priority]}`}>
                    {priorityIcons[bug.priority]}
                    <span className="ml-1">{bug.priority}</span>
                  </span>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <User className="w-4 h-4 mr-1" />
                    {bug.assignee}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Bug className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Démonstration <span className="text-yellow-300">BUG-TRACKER</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Découvrez comment notre système révolutionne la gestion des bugs avec une interface intuitive et des fonctionnalités avancées
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Essayer maintenant
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg">
                Voir les fonctionnalités
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Workflow en Action
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Regardez comment un bug évolue de sa création à sa résolution
            </p>
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Simulation de workflow</h3>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={startAnimation}
                  disabled={isAnimationPlaying}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isAnimationPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isAnimationPlaying ? "En cours..." : "Démarrer"}
                </Button>
                <Button
                  onClick={() => {setAnimationStep(0); setIsAnimationPlaying(false)}}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                <span className="text-gray-400 text-sm">bug-tracker-demo.app</span>
              </div>
              
              <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                {isAnimationPlaying ? (
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-purple-300 font-medium">{animationSteps[animationStep]}</p>
                    <div className="w-64 bg-gray-600 rounded-full h-2 mt-4">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(animationStep / 6) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <p className="text-gray-300">Cliquez sur "Démarrer" pour voir l'animation</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interface réelle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Interface Interactive
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Explorez toutes les vues et fonctionnalités de notre système
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Vue Navigation */}
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setCurrentView("dashboard")}
                variant={currentView === "dashboard" ? "default" : "ghost"}
                className={currentView === "dashboard" ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                onClick={() => setCurrentView("list")}
                variant={currentView === "list" ? "default" : "ghost"}
                className={currentView === "list" ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                <Layout className="w-4 h-4 mr-2" />
                Liste
              </Button>
              <Button
                onClick={() => setCurrentView("kanban")}
                variant={currentView === "kanban" ? "default" : "ghost"}
                className={currentView === "kanban" ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                <CheckSquare className="w-4 h-4 mr-2" />
                Kanban
              </Button>
            </div>
          </div>

          <div className="p-6">
            {currentView === "dashboard" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100">Tickets ouverts</p>
                      <p className="text-3xl font-bold">{bugs.filter(b => b.status === "todo").length}</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-red-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-100">En cours</p>
                      <p className="text-3xl font-bold">{bugs.filter(b => b.status === "in-progress").length}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Résolus</p>
                      <p className="text-3xl font-bold">{bugs.filter(b => b.status === "done").length}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Total</p>
                      <p className="text-3xl font-bold">{bugs.length}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-200" />
                  </div>
                </div>
              </div>
            )}

            {currentView === "kanban" && <KanbanView />}

            {currentView === "list" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <div className="space-y-4">
                      <Button 
                        onClick={() => setShowNewBugForm(!showNewBugForm)}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau Bug
                      </Button>

                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                          <Filter className="w-4 h-4 mr-2" />
                          Filtres
                        </h3>
                        {[
                          { key: "all", label: "Tous", count: bugs.length },
                          { key: "todo", label: "À faire", count: bugs.filter(b => b.status === "todo").length },
                          { key: "in-progress", label: "En cours", count: bugs.filter(b => b.status === "in-progress").length },
                          { key: "done", label: "Terminés", count: bugs.filter(b => b.status === "done").length }
                        ].map(item => (
                          <button
                            key={item.key}
                            onClick={() => setFilter(item.key)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                              filter === item.key 
                                ? "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200" 
                                : "hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span>{item.label}</span>
                              <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                                {item.count}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2">
                  {showNewBugForm && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Créer un nouveau bug</h3>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Titre du bug"
                          value={newBug.title}
                          onChange={(e) => setNewBug({...newBug, title: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                        <textarea
                          placeholder="Description détaillée"
                          value={newBug.description}
                          onChange={(e) => setNewBug({...newBug, description: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                        <div className="flex space-x-4">
                          <select
                            value={newBug.priority}
                            onChange={(e) => setNewBug({...newBug, priority: e.target.value})}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          >
                            <option value="low">Priorité Basse</option>
                            <option value="medium">Priorité Moyenne</option>
                            <option value="high">Priorité Haute</option>
                          </select>
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={handleCreateBug} className="bg-purple-600 hover:bg-purple-700">
                            Créer
                          </Button>
                          <Button variant="outline" onClick={() => setShowNewBugForm(false)}>
                            Annuler
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Liste des Bugs ({filteredBugs.length})
                        </h2>
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Rechercher..."
                              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredBugs.map((bug) => (
                        <div 
                          key={bug.id} 
                          className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                          onClick={() => setSelectedBug(selectedBug === bug.id ? null : bug.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                {statusIcons[bug.status]}
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                  {bug.title}
                                </h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[bug.priority]}`}>
                                  {priorityIcons[bug.priority]}
                                  <span className="ml-1">{bug.priority}</span>
                                </span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 mb-3">{bug.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                  <User className="w-4 h-4 mr-1" />
                                  {bug.assignee}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {bug.created}
                                </div>
                                <div className="flex items-center">
                                  <MessageSquare className="w-4 h-4 mr-1" />
                                  {bug.comments} commentaires
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 mt-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[bug.status]}`}>
                                  {bug.status === "todo" ? "À faire" : bug.status === "in-progress" ? "En cours" : "Terminé"}
                                </span>
                                {bug.labels.map((label, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                                    <Tag className="w-3 h-3 inline mr-1" />
                                    {label}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {selectedBug === bug.id && (
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Détails supplémentaires</h4>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                                  Ce bug a été signalé et nécessite une attention particulière. 
                                  L'équipe de développement travaille activement sur une solution.
                                </p>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">Assigner</Button>
                                  <Button size="sm" variant="outline">Commentaire</Button>
                                  <Button size="sm" variant="outline">Changer le statut</Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Screenshots Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Captures d'écran Interactives
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Explorez les différentes vues et fonctionnalités en survolant les captures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {screenshots.map((screenshot) => (
            <div
              key={screenshot.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredScreenshot(screenshot.id)}
              onMouseLeave={() => setHoveredScreenshot(null)}
            >
              <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300 ${
                hoveredScreenshot === screenshot.id ? 'transform scale-105 shadow-2xl' : ''
              }`}>
                <div className="text-center">
                  <div className="text-6xl mb-4">{screenshot.image}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {screenshot.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {screenshot.description}
                  </p>
                </div>
                
                {hoveredScreenshot === screenshot.id && (
                  <div className="absolute inset-0 bg-purple-600/90 rounded-xl flex items-center justify-center transition-opacity duration-300">
                    <div className="text-center text-white">
                      <ZoomIn className="w-12 h-12 mx-auto mb-4" />
                      <p className="text-lg font-medium">Cliquez pour agrandir</p>
                      <p className="text-purple-200">Découvrez tous les détails</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Fonctionnalités Principales
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Découvrez pourquoi notre système fait la différence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`bg-gray-50 dark:bg-gray-700 rounded-xl p-6 h-full transition-all duration-300 ${
                  hoveredFeature === index ? 'transform -translate-y-2 shadow-xl' : 'shadow-lg'
                }`}>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                  
                  {hoveredFeature === index && (
                    <div className="absolute bottom-6 right-6">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Nos Performances
            </h2>
            <p className="text-purple-100 text-lg">
              Des chiffres qui parlent d'eux-mêmes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "96.9%", label: "Uptime garanti", icon: <Target className="w-8 h-8" /> },
              { number: "< 2s", label: "Temps de réponse", icon: <Zap className="w-8 h-8" /> },
              { number: "10k+", label: "Bugs résolus", icon: <CheckCircle className="w-8 h-8" /> },
              { number: "500+", label: "Équipes actives", icon: <Users className="w-8 h-8" /> }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-purple-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Prêt à Révolutionner Votre Gestion des Bugs ?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Rejoignez des milliers d'équipes qui ont déjà optimisé leur workflow avec notre solution
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/register">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg">
                    <UserPlus className="w-5 h-5 mr-2" />
                    S'inscrire gratuitement
                </Button>
            </Link>
            <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Voir les tarifs
                </Button>
            </Link>
            <Link href="/contact">
                <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg">
                    <Mail className="w-5 h-5 mr-2" />
                    Contacter l'équipe
                </Button>
            </Link>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Besoin d'aide ? Notre équipe est là pour vous</p>
            <div className="flex justify-center items-center space-x-6">
              <a href="#" className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                +237 6 56 91 28 97
              </a>
              <a href="#" className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                demo@bug-tracker.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Demo Badge */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Démo en ligne</span>
        </div>
      </div>
    </div>
  )
}
