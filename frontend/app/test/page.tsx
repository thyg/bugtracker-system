"use client";

import { useState } from "react";
import { ChevronDown, Bug, CheckCircle, AlertTriangle, Clock, TrendingUp, Filter, Search, Eye, MessageSquare, User, Calendar, ArrowUp, ArrowDown, Minus, Settings, Bell, Download, RefreshCw } from "lucide-react";

export default function UpdatesPage() {
  const [filter, setFilter] = useState("Tous");
  const [priority, setPriority] = useState("Toutes");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const updates = [
    {
      id: "BT-2024-001",
      title: "Interface utilisateur ne répond pas après connexion",
      status: "resolved",
      priority: "high",
      assignee: "Marie Dubois",
      reporter: "Jean Martin",
      date: "2024-12-30",
      comments: 8,
      views: 45,
      description: "Les utilisateurs signalent que l'interface se fige après la connexion",
      tags: ["UI", "Authentication", "Critical"],
      timeSpent: "4h 30m"
    },
    {
      id: "BT-2024-002", 
      title: "Erreur 500 lors de l'upload de fichiers volumineux",
      status: "in-progress",
      priority: "high",
      assignee: "Pierre Moreau",
      reporter: "Sophie Chen",
      date: "2024-12-29",
      comments: 12,
      views: 67,
      description: "Échec de l'upload pour les fichiers > 10MB",
      tags: ["Backend", "File Upload", "Performance"],
      timeSpent: "6h 15m"
    },
    {
      id: "BT-2024-003",
      title: "Notifications push ne s'affichent pas sur mobile",
      status: "open",
      priority: "medium",
      assignee: "Lisa Wang",
      reporter: "Alex Rodriguez",
      date: "2024-12-28",
      comments: 5,
      views: 23,
      description: "Les notifications push ne parviennent pas aux appareils iOS",
      tags: ["Mobile", "iOS", "Notifications"],
      timeSpent: "2h 45m"
    },
    {
      id: "BT-2024-004",
      title: "Performance lente sur la page des rapports",
      status: "testing",
      priority: "medium",
      assignee: "Thomas Kumar",
      reporter: "Emma Wilson",
      date: "2024-12-27",
      comments: 15,
      views: 89,
      description: "Temps de chargement > 10s pour les rapports complexes",
      tags: ["Performance", "Reports", "Database"],
      timeSpent: "8h 20m"
    },
    {
      id: "BT-2024-005",
      title: "Texte coupé dans les emails de notification",
      status: "resolved",
      priority: "low",
      assignee: "Sarah Kim",
      reporter: "David Brown",
      date: "2024-12-26",
      comments: 3,
      views: 18,
      description: "Contenu des emails tronqué sur certains clients",
      tags: ["Email", "Templates", "UI"],
      timeSpent: "1h 30m"
    }
  ];

  const stats = [
    { label: "Bugs Ouverts", value: "24", icon: Bug, color: "red", change: "+3" },
    { label: "Résolus Cette Semaine", value: "18", icon: CheckCircle, color: "green", change: "+12" },
    { label: "En Cours", value: "7", icon: Clock, color: "yellow", change: "-2" },
    { label: "Temps Moyen de Résolution", value: "3.2j", icon: TrendingUp, color: "blue", change: "-0.8j" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "testing": return "bg-purple-100 text-purple-800";
      case "open": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high": return <ArrowUp className="w-4 h-4" />;
      case "medium": return <Minus className="w-4 h-4" />;
      case "low": return <ArrowDown className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const filteredUpdates = updates.filter(update => {
    const matchesFilter = filter === "Tous" || update.status === filter.toLowerCase().replace("-", "-");
    const matchesPriority = priority === "Toutes" || update.priority === priority.toLowerCase();
    const matchesSearch = update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesPriority && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Mises à Jour Bug Tracker</h1>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isRefreshing ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                <span className="text-sm text-gray-600">
                  {isRefreshing ? 'Actualisation...' : 'Synchronisé'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Actualiser</span>
              </button>
              
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Exporter</span>
              </button>
              
              <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <Bug className="w-4 h-4" />
                <span>Nouveau Bug</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      stat.change.startsWith('+') ? 'bg-green-100 text-green-700' :
                      stat.change.startsWith('-') && stat.label.includes('Temps') ? 'bg-green-100 text-green-700' :
                      stat.change.startsWith('-') ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un bug..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Tous">Tous les Statuts</option>
              <option value="open">Ouverts</option>
              <option value="in-progress">En Cours</option>
              <option value="testing">En Test</option>
              <option value="resolved">Résolus</option>
            </select>
            
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border border-gray-300 bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Toutes">Toutes Priorités</option>
              <option value="high">Haute</option>
              <option value="medium">Moyenne</option>
              <option value="low">Basse</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Trier par Date</option>
              <option value="priority">Trier par Priorité</option>
              <option value="status">Trier par Statut</option>
              <option value="assignee">Trier par Assigné</option>
            </select>
          </div>
        </div>

        {/* Bug List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Bugs Récents ({filteredUpdates.length})
              </h2>
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Configurer les colonnes</span>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredUpdates.map((update) => (
              <div key={update.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {update.id}
                      </span>
                      <div className={`flex items-center space-x-1 ${getPriorityColor(update.priority)}`}>
                        {getPriorityIcon(update.priority)}
                        <span className="text-sm font-medium capitalize">{update.priority}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(update.status)}`}>
                        {update.status === 'in-progress' ? 'En Cours' :
                         update.status === 'resolved' ? 'Résolu' :
                         update.status === 'testing' ? 'En Test' :
                         update.status === 'open' ? 'Ouvert' : update.status}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{update.title}</h3>
                    <p className="text-gray-600 mb-3">{update.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {update.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>Assigné: {update.assignee}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>Rapporté par: {update.reporter}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(update.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{update.timeSpent}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 ml-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{update.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{update.views}</span>
                      </div>
                    </div>
                    
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Voir Détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredUpdates.length === 0 && (
            <div className="p-12 text-center">
              <Bug className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun bug trouvé</h3>
              <p className="text-gray-600">Essayez de modifier vos filtres ou votre recherche.</p>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {filteredUpdates.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Affichage de {filteredUpdates.length} sur {updates.length} bugs
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Précédent
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Suivant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// bon ici ohhh