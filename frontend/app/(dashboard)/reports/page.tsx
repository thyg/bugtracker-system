"use client"

import React, { useState, useEffect } from "react"
import { 
  User, 
  FileText, 
  Download, 
  Filter, 
  Search, 
  Calendar, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Eye, 
  Edit, 
  Trash2,
  Plus,
  MoreVertical,
  Bug,
  Target,
  Activity,
  LogOut,
  Settings,
  Bell,
  BarChart3,
  Shield,
  Database,
  Monitor,
  Smartphone,
  Code,
  Globe,
  Zap,
  FileX,
  FilePlus,
  Archive,
  UserCheck
} from "lucide-react"

// Données utilisateur réelles (simulées mais complètes)
// Données utilisateur réelles (adaptées au contexte camerounais)
const createRealUserData = () => {
  const users = [
    {
      id: 1,
      name: "Brice Tchounga",
      email: "brice.tchounga@camtech.cm",
      role: "Développeur Full Stack",
      department: "Équipe Web",
      joinDate: "2022-04-20",
      lastLogin: new Date().toISOString(),
      avatar: null,
      skills: ["React", "Laravel", "MySQL"],
      reportsCount: 38,
      bugsResolved: 195,
      avgResolutionTime: "2.0h",
      status: "Actif",
      location: "Douala, Cameroun"
    },
    {
      id: 2,
      name: "Solange Nguimfack",
      email: "solange.nguimfack@camtech.cm",
      role: "Ingénieure DevOps",
      department: "Infrastructure & Cloud",
      joinDate: "2021-07-12",
      lastLogin: new Date(Date.now() - 2 * 3600000).toISOString(), // il y a 2h
      avatar: null,
      skills: ["Linux", "Docker", "CI/CD", "AWS"],
      reportsCount: 54,
      bugsResolved: 278,
      avgResolutionTime: "1.6h",
      status: "Actif",
      location: "Yaoundé, Cameroun"
    },
    {
      id: 3,
      name: "Fabrice Nkoue",
      email: "fabrice.nkoue@camtech.cm",
      role: "Testeur QA",
      department: "Qualité Logicielle",
      joinDate: "2023-01-15",
      lastLogin: new Date(Date.now() - 86400000).toISOString(), // il y a 24h
      avatar: null,
      skills: ["Cypress", "Jest", "Postman"],
      reportsCount: 89,
      bugsResolved: 159,
      avgResolutionTime: "3.2h",
      status: "Actif",
      location: "Bafoussam, Cameroun"
    }
  ]

  return users[Math.floor(Math.random() * users.length)]
}


// Génération de données de rapports plus réalistes et nombreuses
const generateReports = () => {
  const types = [
    "Performance", "Sécurité", "Intégration", "UX/UI", "Base de Données", 
    "API", "Mobile", "DevOps", "Monitoring", "Tests", "Documentation"
  ]
  
  const statuses = ["Publié", "En cours", "Brouillon", "Archivé", "En révision"]
  const priorities = ["Critique", "Haute", "Moyenne", "Basse"]
  
  const titleTemplates = {
    "Performance": [
      "Optimisation des performances - Module {module}",
      "Analyse de charge - {service}",
      "Monitoring performance - {period}",
      "Rapport vitesse - Interface {interface}"
    ],
    "Sécurité": [
      "Audit sécurité - {module}",
      "Évaluation vulnérabilités - {service}",
      "Test de pénétration - {system}",
      "Conformité RGPD - {module}"
    ],
    "Intégration": [
      "Tests d'intégration - API {version}",
      "Validation flux - {service}",
      "Intégration continue - {pipeline}",
      "Tests E2E - {module}"
    ],
    "UX/UI": [
      "Analyse UX - {interface}",
      "Tests utilisabilité - {feature}",
      "Optimisation UI - {component}",
      "Étude comportement - {page}"
    ],
    "Base de Données": [
      "Optimisation requêtes - {database}",
      "Migration données - {version}",
      "Analyse performance - {schema}",
      "Maintenance DB - {period}"
    ]
  }

  const modules = ["Authentification", "Paiement", "Profil", "Dashboard", "Notifications", "Rapports", "Admin"]
  const services = ["API Gateway", "User Service", "Payment Service", "Analytics", "CDN", "Cache"]
  const periods = ["Q1 2024", "Q2 2024", "Q3 2024", "Décembre 2024", "Janvier 2025"]

  const reports = []
  
  for (let i = 1; i <= 50; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const priority = priorities[Math.floor(Math.random() * priorities.length)]
    
    const templates = titleTemplates[type] || ["Rapport {type} - {module}"]
    const template = templates[Math.floor(Math.random() * templates.length)]
    
    const title = template
      .replace("{module}", modules[Math.floor(Math.random() * modules.length)])
      .replace("{service}", services[Math.floor(Math.random() * services.length)])
      .replace("{period}", periods[Math.floor(Math.random() * periods.length)])
      .replace("{version}", `v${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}`)
      .replace("{interface}", `Interface ${Math.floor(Math.random() * 5) + 1}`)
      .replace("{system}", `Système ${Math.floor(Math.random() * 3) + 1}`)
      .replace("{database}", `DB_${Math.floor(Math.random() * 3) + 1}`)
      .replace("{component}", `Component${Math.floor(Math.random() * 10) + 1}`)
      .replace("{feature}", `Feature ${Math.floor(Math.random() * 20) + 1}`)
      .replace("{page}", `Page ${Math.floor(Math.random() * 15) + 1}`)
      .replace("{pipeline}", `Pipeline ${Math.floor(Math.random() * 5) + 1}`)
      .replace("{schema}", `Schema ${Math.floor(Math.random() * 8) + 1}`)
    
    const createdDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    const modifiedDate = new Date(createdDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000)
    
    reports.push({
      id: i,
      title,
      type,
      status,
      priority,
      createdAt: createdDate.toISOString().split('T')[0],
      lastModified: modifiedDate.toISOString().split('T')[0],
      views: Math.floor(Math.random() * 500) + 1,
      bugsFound: Math.floor(Math.random() * 50),
      author: i % 3 === 0 ? "Marie Martin" : i % 3 === 1 ? "Jean Dupont" : "Alex Bernard",
      assignedTo: modules[Math.floor(Math.random() * modules.length)],
      estimatedTime: `${Math.floor(Math.random() * 8) + 1}h`,
      actualTime: `${Math.floor(Math.random() * 10) + 1}h`,
      severity: Math.floor(Math.random() * 5) + 1,
      tags: [
        type.toLowerCase(),
        modules[Math.floor(Math.random() * modules.length)].toLowerCase(),
        priority.toLowerCase()
      ],
      description: `Analyse détaillée et évaluation complète du ${type.toLowerCase()} avec focus sur l'amélioration des performances et la résolution des problèmes identifiés. Ce rapport couvre les aspects techniques, les recommandations d'amélioration et les actions correctives nécessaires.`
    })
  }
  
  return reports.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
}

export default function EnhancedUserReportsPage() {
  const [currentUser, setCurrentUser] = useState(null)
  const [reports, setReports] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("Tous")
  const [filterStatus, setFilterStatus] = useState("Tous")
  const [filterPriority, setFilterPriority] = useState("Tous")
  const [selectedReports, setSelectedReports] = useState([])
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isCreatingReport, setIsCreatingReport] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [reportsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState("lastModified")
  const [sortOrder, setSortOrder] = useState("desc")

  // Initialisation des données
  useEffect(() => {
    const user = createRealUserData()
    setCurrentUser(user)
    setReports(generateReports())
  }, [])

  // Fonction de déconnexion réelle
  const handleLogout = async () => {
    setIsLoggingOut(true)
    
    try {
      // Simulation d'une requête de déconnexion
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Nettoyage des données locales
      setCurrentUser(null)
      setReports([])
      setSelectedReports([])
      
      // Redirection (simulée)
      console.log("Utilisateur déconnecté avec succès")
      alert("Vous avez été déconnecté avec succès!")
      
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
      alert("Erreur lors de la déconnexion")
    } finally {
      setIsLoggingOut(false)
    }
  }

  // Fonction de création de rapport
  const handleCreateReport = async (reportData) => {
    setIsCreatingReport(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newReport = {
        id: reports.length + 1,
        title: reportData.title || "Nouveau Rapport",
        type: reportData.type || "Performance",
        status: "Brouillon",
        priority: reportData.priority || "Moyenne",
        createdAt: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        views: 0,
        bugsFound: 0,
        author: currentUser?.name || "Utilisateur",
        assignedTo: reportData.assignedTo || "Non assigné",
        estimatedTime: reportData.estimatedTime || "2h",
        actualTime: "0h",
        severity: 1,
        tags: [reportData.type?.toLowerCase() || "nouveau"],
        description: reportData.description || "Nouveau rapport créé"
      }
      
      setReports(prev => [newReport, ...prev])
      setShowCreateModal(false)
      alert("Rapport créé avec succès!")
      
    } catch (error) {
      console.error("Erreur lors de la création:", error)
      alert("Erreur lors de la création du rapport")
    } finally {
      setIsCreatingReport(false)
    }
  }

  // Fonction d'exportation réelle
  const handleExport = async () => {
    setIsExporting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const filteredData = filteredReports.map(report => ({
        Titre: report.title,
        Type: report.type,
        Statut: report.status,
        Priorité: report.priority,
        "Date de création": report.createdAt,
        "Dernière modification": report.lastModified,
        Vues: report.views,
        "Bugs trouvés": report.bugsFound,
        Auteur: report.author,
        "Assigné à": report.assignedTo
      }))
      
      const csvContent = [
        Object.keys(filteredData[0]).join(','),
        ...filteredData.map(row => Object.values(row).join(','))
      ].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `rapports_${new Date().toISOString().split('T')[0]}.csv`
      link.click()
      
      alert("Export réalisé avec succès!")
      
    } catch (error) {
      console.error("Erreur lors de l'export:", error)
      alert("Erreur lors de l'export")
    } finally {
      setIsExporting(false)
    }
  }

  // Fonction pour obtenir les initiales
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  // Filtrage et tri des rapports
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "Tous" || report.type === filterType
    const matchesStatus = filterStatus === "Tous" || report.status === filterStatus
    const matchesPriority = filterPriority === "Tous" || report.priority === filterPriority
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority
  }).sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1
    }
    return a[sortBy] < b[sortBy] ? 1 : -1
  })

  // Pagination
  const indexOfLastReport = currentPage * reportsPerPage
  const indexOfFirstReport = indexOfLastReport - reportsPerPage
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport)
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage)

  const getStatusColor = (status) => {
    switch (status) {
      case "Publié": return "bg-green-100 text-green-800 border-green-200"
      case "En cours": return "bg-blue-100 text-blue-800 border-blue-200"
      case "Brouillon": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Archivé": return "bg-gray-100 text-gray-800 border-gray-200"
      case "En révision": return "bg-purple-100 text-purple-800 border-purple-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critique": return "text-red-600 bg-red-50"
      case "Haute": return "text-orange-600 bg-orange-50"
      case "Moyenne": return "text-yellow-600 bg-yellow-50"
      case "Basse": return "text-green-600 bg-green-50"
      default: return "text-gray-600 bg-gray-50"
    }
  }

  const handleSelectReport = (reportId) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    )
  }

  const handleSelectAll = () => {
    if (selectedReports.length === currentReports.length) {
      setSelectedReports([])
    } else {
      setSelectedReports(currentReports.map(report => report.id))
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des données utilisateur...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard Rapports</h1>
                <p className="text-xs text-gray-500">Gestion des rapports utilisateur</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  {getInitials(currentUser.name)}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 text-sm font-medium flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  {isLoggingOut ? "Déconnexion..." : "Déconnexion"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profil utilisateur détaillé */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">{getInitials(currentUser.name)}</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-1">{currentUser.name}</h2>
                <p className="text-gray-600 mb-1">{currentUser.email}</p>
                <p className="text-sm text-gray-500 mb-1">{currentUser.role} • {currentUser.department}</p>
                <p className="text-sm text-gray-500">
                  Membre depuis {new Date(currentUser.joinDate).toLocaleDateString('fr-FR')} • {currentUser.location}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">{currentUser.status}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-2">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{currentUser.reportsCount}</p>
                <p className="text-sm text-gray-600">Rapports</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-xl mb-2">
                  <Bug className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{currentUser.bugsResolved}</p>
                <p className="text-sm text-gray-600">Bugs Résolus</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-50 rounded-xl mb-2">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{currentUser.avgResolutionTime}</p>
                <p className="text-sm text-gray-600">Temps Moyen</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-50 rounded-xl mb-2">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{Math.round(currentUser.bugsResolved / currentUser.reportsCount)}</p>
                <p className="text-sm text-gray-600">Bugs/Rapport</p>
              </div>
            </div>
          </div>
        </div>

        {/* Barre d'outils avancée */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un rapport..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Tous">Tous les types</option>
                <option value="Performance">Performance</option>
                <option value="Sécurité">Sécurité</option>
                <option value="Intégration">Intégration</option>
                <option value="UX/UI">UX/UI</option>
                <option value="Base de Données">Base de Données</option>
                <option value="API">API</option>
                <option value="Mobile">Mobile</option>
                <option value="DevOps">DevOps</option>
                <option value="Monitoring">Monitoring</option>
                <option value="Tests">Tests</option>
                <option value="Documentation">Documentation</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Tous">Tous les statuts</option>
                <option value="Publié">Publié</option>
                <option value="En cours">En cours</option>
                <option value="Brouillon">Brouillon</option>
                <option value="Archivé">Archivé</option>
                <option value="En révision">En révision</option>
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Tous">Toutes priorités</option>
                <option value="Critique">Critique</option>
                <option value="Haute">Haute</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Basse">Basse</option>
              </select>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowCreateModal(true)}
                disabled={isCreatingReport}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                {isCreatingReport ? "Création..." : "Nouveau Rapport"}
              </button>
              <button 
                onClick={handleExport}
                disabled={isExporting || filteredReports.length === 0}
                className="px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2 font-medium disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                {isExporting ? "Export..." : "Exporter"}
              </button>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{filteredReports.length}</p>
              <p className="text-sm text-gray-600">Rapports trouvés</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{filteredReports.filter(r => r.status === "Publié").length}</p>
              <p className="text-sm text-gray-600">Publiés</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{filteredReports.filter(r => r.status === "En cours").length}</p>
              <p className="text-sm text-gray-600">En cours</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{filteredReports.filter(r => r.priority === "Critique").length}</p>
              <p className="text-sm text-gray-600">Critiques</p>
            </div>
          </div>
        </div>

        {/* Liste des rapports avec pagination */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                Mes Rapports ({filteredReports.length})
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedReports.length === currentReports.length && currentReports.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">
                    {selectedReports.length} sélectionné(s)
                  </span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="lastModified">Dernière modification</option>
                  <option value="createdAt">Date de création</option>
                  <option value="title">Titre</option>
                  <option value="views">Vues</option>
                  <option value="bugsFound">Bugs trouvés</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {currentReports.map((report) => (
              <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedReports.includes(report.id)}
                    onChange={() => handleSelectReport(report.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-lg font-bold text-gray-900 truncate">
                            {report.title}
                          </h4>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                          <span className={`px-2 py-1 text-xs font-bold rounded-lg ${getPriorityColor(report.priority)}`}>
                            {report.priority}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {report.description}
                        </p>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Créé le {new Date(report.createdAt).toLocaleDateString('fr-FR')}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Modifié le {new Date(report.lastModified).toLocaleDateString('fr-FR')}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {report.views} vues
                            </div>
                            <div className="flex items-center gap-1">
                              <Bug className="w-4 h-4" />
                              {report.bugsFound} bugs trouvés
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <UserCheck className="w-4 h-4" />
                              Par {report.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              Assigné à {report.assignedTo}
                            </div>
                            <div className="flex items-center gap-1">
                              <Activity className="w-4 h-4" />
                              Sévérité {report.severity}/5
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                            {report.type}
                          </span>
                          {report.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-1 text-gray-500">
                            <Clock className="w-4 h-4" />
                            Estimé: {report.estimatedTime}
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <TrendingUp className="w-4 h-4" />
                            Réel: {report.actualTime}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Voir">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Modifier">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="Plus d'options">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Affichage {indexOfFirstReport + 1}-{Math.min(indexOfLastReport, filteredReports.length)} sur {filteredReports.length} rapports
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Précédent
                  </button>
                  
                  <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1
                      if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                              currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="px-2 py-2 text-gray-400">...</span>
                      }
                      return null
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {filteredReports.length === 0 && (
            <div className="p-12 text-center">
              <FileX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun rapport trouvé</h3>
              <p className="text-gray-600 mb-4">Essayez de modifier vos critères de recherche ou créez un nouveau rapport.</p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                Créer mon premier rapport
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de création de rapport */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Créer un nouveau rapport</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                handleCreateReport({
                  title: formData.get('title'),
                  type: formData.get('type'),
                  priority: formData.get('priority'),
                  assignedTo: formData.get('assignedTo'),
                  estimatedTime: formData.get('estimatedTime'),
                  description: formData.get('description')
                })
              }}
              className="p-6 space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre du rapport *
                </label>
                <input
                  name="title"
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Analyse de performances Q1 2025"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de rapport *
                  </label>
                  <select
                    name="type"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Performance">Performance</option>
                    <option value="Sécurité">Sécurité</option>
                    <option value="Intégration">Intégration</option>
                    <option value="UX/UI">UX/UI</option>
                    <option value="Base de Données">Base de Données</option>
                    <option value="API">API</option>
                    <option value="Mobile">Mobile</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Monitoring">Monitoring</option>
                    <option value="Tests">Tests</option>
                    <option value="Documentation">Documentation</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priorité
                  </label>
                  <select
                    name="priority"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Basse">Basse</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Haute">Haute</option>
                    <option value="Critique">Critique</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigné à
                  </label>
                  <input
                    name="assignedTo"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nom de l'assigné"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temps estimé
                  </label>
                  <input
                    name="estimatedTime"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: 4h"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Décrivez l'objectif et le contenu de ce rapport..."
                ></textarea>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isCreatingReport}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isCreatingReport ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Création...
                    </>
                  ) : (
                    <>
                      <FilePlus className="w-5 h-5" />
                      Créer le rapport
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}