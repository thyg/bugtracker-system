"use client"

import { useAuth } from "@/lib/auth-context"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

import {
  XCircle,
  MessageSquare,
  Code,
  ChevronDown,
  Search,
  BarChart3,
  Send,
  Edit,
  Copy,
  Trash2,
  MoreHorizontal,
  Plus,
  MessageCircle,
  Bell,
  Clock,
  Activity,
  X,
  Check,
  AlertTriangle,
  Star,
  ThumbsUp,
  ThumbsDown
} from "lucide-react"
import { formatDate } from "@/lib/utils"
import Head from 'next/head';

// Données d'exemple avec des langages de programmation
const initialAlertRules = [
  {
    id: 1,
    name: 'Notification pour les erreurs critiques',
    status: 'active',
    project: 'JavaScript',
    team: 'Équipe Frontend',
    type: 'Alertes de problème',
    lastTriggered: null,
    createdAt: '2024-01-15T10:30:00Z',
    description: 'Déclenche une alerte pour toute erreur critique dans l\'application'
  },
  {
    id: 2,
    name: 'Surveillance du taux d\'erreur API',
    status: 'inactive',
    project: 'Python',
    team: 'Équipe Backend',
    type: 'Alertes métriques',
    lastTriggered: '2024-01-20T14:25:00Z',
    createdAt: '2024-01-10T09:15:00Z',
    description: 'Surveille le taux d\'erreur des endpoints API'
  },
  {
    id: 3,
    name: 'Vérification de disponibilité du service',
    status: 'active',
    project: 'TypeScript',
    team: 'Équipe DevOps',
    type: 'Moniteurs de disponibilité',
    lastTriggered: null,
    createdAt: '2024-01-18T16:45:00Z',
    description: 'Vérifie la disponibilité du service toutes les 5 minutes'
  },
  {
    id: 4,
    name: 'Performance base de données',
    status: 'active',
    project: 'Java',
    team: 'Équipe Backend',
    type: 'Alertes métriques',
    lastTriggered: '2024-01-22T09:15:00Z',
    createdAt: '2024-01-12T11:20:00Z',
    description: 'Surveille les performances des requêtes de base de données'
  },
  {
    id: 5,
    name: 'Tâche de sauvegarde quotidienne',
    status: 'inactive',
    project: 'Go',
    team: 'Équipe Infrastructure',
    type: 'Moniteurs Cron',
    lastTriggered: '2024-01-21T02:00:00Z',
    createdAt: '2024-01-08T15:30:00Z',
    description: 'Vérifie l\'exécution de la tâche de sauvegarde quotidienne'
  }
];

// Historique des alertes
const initialAlertHistory = [
  {
    id: 1,
    ruleName: 'Performance base de données',
    project: 'Java',
    status: 'resolved',
    triggeredAt: '2024-01-22T09:15:00Z',
    resolvedAt: '2024-01-22T09:45:00Z',
    severity: 'high',
    message: 'Temps de réponse des requêtes supérieur à 2 secondes'
  },
  {
    id: 2,
    ruleName: 'Tâche de sauvegarde quotidienne',
    project: 'Go',
    status: 'active',
    triggeredAt: '2024-01-21T02:15:00Z',
    resolvedAt: null,
    severity: 'medium',
    message: 'Échec de la tâche de sauvegarde - tentative de reprise'
  },
  {
    id: 3,
    ruleName: 'Surveillance du taux d\'erreur API',
    project: 'Python',
    status: 'resolved',
    triggeredAt: '2024-01-20T14:25:00Z',
    resolvedAt: '2024-01-20T14:35:00Z',
    severity: 'medium',
    message: 'Taux d\'erreur API dépassé : 5.2%'
  }
];

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState('rules');
  const [alertTypeFilter, setAlertTypeFilter] = useState('Tous');
  const [teamFilter, setTeamFilter] = useState('Toutes les équipes');
  const [projectFilter, setProjectFilter] = useState('Tous les projets');
  const [searchQuery, setSearchQuery] = useState('');
  const [alertRules, setAlertRules] = useState(initialAlertRules);
  const [alertHistory, setAlertHistory] = useState(initialAlertHistory);
  const [showDropdowns, setShowDropdowns] = useState({
    alertType: false,
    team: false,
    project: false
  });
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [editingRule, setEditingRule] = useState(null);

  // Authentification
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()


  // Formulaire pour créer/éditer une alerte
  const [alertForm, setAlertForm] = useState({
    name: '',
    project: 'JavaScript',
    team: 'Mon équipe',
    type: 'Alertes de problème',
    description: '',
    status: 'active'
  });

  // Formulaire de feedback
  const [feedbackForm, setFeedbackForm] = useState({
    type: 'suggestion',
    message: '',
    rating: 5
  });

  const alertTypes = ['Tous', 'Alertes de problème', 'Alertes métriques', 'Moniteurs de disponibilité', 'Moniteurs Cron'];
  const teams = ['Toutes les équipes', 'Mon équipe', 'Équipe Frontend', 'Équipe Backend', 'Équipe DevOps', 'Équipe Infrastructure'];
  const projects = ['Tous les projets', 'JavaScript', 'Python', 'TypeScript', 'Java', 'Go'];

  const filteredAlerts = alertRules.filter(rule => {
    const matchesType = alertTypeFilter === 'Tous' || rule.type === alertTypeFilter;
    const matchesTeam = teamFilter === 'Toutes les équipes' || rule.team === teamFilter;
    const matchesProject = projectFilter === 'Tous les projets' || rule.project === projectFilter;
    const matchesSearch = rule.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesTeam && matchesProject && matchesSearch;
  });

  const filteredHistory = alertHistory.filter(alert => {
    const matchesProject = projectFilter === 'Tous les projets' || alert.project === projectFilter;
    const matchesSearch = alert.ruleName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         alert.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProject && matchesSearch;
  });

  const toggleDropdown = (dropdown) => {
    setShowDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const handleCreateAlert = () => {
    setShowCreateModal(true);
    setEditingRule(null);
    setAlertForm({
      name: '',
      project: 'JavaScript',
      team: 'Mon équipe',
      type: 'Alertes de problème',
      description: '',
      status: 'active'
    });
  };

  const handleEditAlert = (rule) => {
    setEditingRule(rule);
    setAlertForm({
      name: rule.name,
      project: rule.project,
      team: rule.team,
      type: rule.type,
      description: rule.description,
      status: rule.status
    });
    setShowCreateModal(true);
  };

  const handleSaveAlert = () => {
    if (!alertForm.name.trim()) return;

    if (editingRule) {
      // Édition
      setAlertRules(prev => prev.map(rule => 
        rule.id === editingRule.id 
          ? { ...rule, ...alertForm }
          : rule
      ));
    } else {
      // Création
      const newRule = {
        id: Math.max(...alertRules.map(r => r.id)) + 1,
        ...alertForm,
        lastTriggered: null,
        createdAt: new Date().toISOString()
      };
      setAlertRules(prev => [...prev, newRule]);
    }

    setShowCreateModal(false);
    setEditingRule(null);
  };

  const handleAction = (action, ruleId) => {
    setShowActionMenu(null);
    
    switch(action) {
      case 'edit':
        const ruleToEdit = alertRules.find(rule => rule.id === ruleId);
        if (ruleToEdit) handleEditAlert(ruleToEdit);
        break;
      case 'duplicate':
        const ruleToDuplicate = alertRules.find(rule => rule.id === ruleId);
        if (ruleToDuplicate) {
          const newRule = {
            ...ruleToDuplicate,
            id: Math.max(...alertRules.map(r => r.id)) + 1,
            name: `${ruleToDuplicate.name} (Copie)`,
            status: 'inactive',
            createdAt: new Date().toISOString()
          };
          setAlertRules(prev => [...prev, newRule]);
        }
        break;
      case 'delete':
        if (confirm('Êtes-vous sûr de vouloir supprimer cette règle d\'alerte ?')) {
          setAlertRules(prev => prev.filter(rule => rule.id !== ruleId));
        }
        break;
    }
  };

  const handleSendFeedback = () => {
    if (!feedbackForm.message.trim()) return;
    
    // Simulation d'envoi de feedback
    alert(`Merci pour votre ${feedbackForm.type} ! Votre message a été envoyé avec succès.`);
    setShowFeedbackModal(false);
    setFeedbackForm({
      type: 'suggestion',
      message: '',
      rating: 5
    });
  };

  const formatLastTriggered = (dateString) => {
    if (!dateString) return 'Jamais déclenchée';
    const date = new Date(dateString);
    return `Dernière fois: ${date.toLocaleDateString('fr-FR')} à ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
  };

  const formatHistoryDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('fr-FR')} à ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
  };

  const getStatusIcon = (status) => {
    return status === 'active' ? (
      <div className="flex items-center">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
        <span className="text-green-700 text-sm font-medium">Actif</span>
      </div>
    ) : (
      <div className="flex items-center">
        <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
        <span className="text-gray-500 text-sm font-medium">Inactif</span>
      </div>
    );
  };

  const getHistoryStatusIcon = (status) => {
    switch(status) {
      case 'resolved':
        return <div className="flex items-center"><Check className="h-4 w-4 text-green-500 mr-1" /><span className="text-green-700 text-sm">Résolu</span></div>;
      case 'active':
        return <div className="flex items-center"><AlertTriangle className="h-4 w-4 text-red-500 mr-1" /><span className="text-red-700 text-sm">Actif</span></div>;
      default:
        return <div className="flex items-center"><Clock className="h-4 w-4 text-yellow-500 mr-1" /><span className="text-yellow-700 text-sm">En attente</span></div>;
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Alertes de problème':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Alertes métriques':
        return <BarChart3 className="h-4 w-4 text-blue-500" />;
      case 'Moniteurs de disponibilité':
        return <Activity className="h-4 w-4 text-green-500" />;
      case 'Moniteurs Cron':
        return <Clock className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getProjectIcon = (project) => {
    const colors = {
      'JavaScript': 'bg-yellow-100 text-yellow-800',
      'Python': 'bg-blue-100 text-blue-800',
      'TypeScript': 'bg-blue-100 text-blue-800',
      'Java': 'bg-red-100 text-red-800',
      'Go': 'bg-cyan-100 text-cyan-800'
    };
    return colors[project] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>  
      <Head>
        <title>Alertes | Mon Projet</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* En-tête */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Alertes</h1>
                <p className="text-gray-600 mt-1">Gérez vos règles d'alerte et surveillez l'historique</p>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleCreateAlert}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Créer une alerte
                </button>
                <button 
                  onClick={() => setShowFeedbackModal(true)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Donner un avis
                </button>
              </div>
            </div>
          </div>

          {/* Onglets */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="flex border-b">
              <button
                className={`px-6 py-4 font-medium ${activeTab === 'rules' 
                  ? 'border-b-2 border-indigo-500 text-indigo-600 bg-indigo-50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'} transition-colors`}
                onClick={() => setActiveTab('rules')}
              >
                <div className="flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  Règles d'alerte ({filteredAlerts.length})
                </div>
              </button>
              <button
                className={`px-6 py-4 font-medium ${activeTab === 'history' 
                  ? 'border-b-2 border-indigo-500 text-indigo-600 bg-indigo-50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'} transition-colors`}
                onClick={() => setActiveTab('history')}
              >
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Historique ({filteredHistory.length})
                </div>
              </button>
            </div>

            {/* Filtres et recherche */}
            <div className="p-6 border-b bg-gray-50">
              <div className="flex flex-wrap items-center gap-4">
                {/* Filtre équipes */}
                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown('team')}
                    className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium">{teamFilter}</span>
                    <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                  </button>
                  {showDropdowns.team && (
                    <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                      {teams.map(team => (
                        <div
                          key={team}
                          onClick={() => {
                            setTeamFilter(team);
                            setShowDropdowns(prev => ({...prev, team: false}));
                          }}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                        >
                          {team}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Filtre projets */}
                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown('project')}
                    className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium">{projectFilter}</span>
                    <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                  </button>
                  {showDropdowns.project && (
                    <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                      {projects.map(project => (
                        <div
                          key={project}
                          onClick={() => {
                            setProjectFilter(project);
                            setShowDropdowns(prev => ({...prev, project: false}));
                          }}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                        >
                          {project}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Filtre type d'alerte - seulement pour l'onglet rules */}
                {activeTab === 'rules' && (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown('alertType')}
                      className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-medium">Type: {alertTypeFilter}</span>
                      <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                    </button>
                    {showDropdowns.alertType && (
                      <div className="absolute z-10 mt-1 w-56 bg-white border border-gray-300 rounded-lg shadow-lg">
                        {alertTypes.map(type => (
                          <div
                            key={type}
                            onClick={() => {
                              setAlertTypeFilter(type);
                              setShowDropdowns(prev => ({...prev, alertType: false}));
                            }}
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm flex items-center"
                          >
                            {type !== 'Tous' && (
                              <span className="mr-2">{getTypeIcon(type)}</span>
                            )}
                            {type}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Recherche */}
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={activeTab === 'rules' ? "Rechercher par nom..." : "Rechercher dans l'historique..."}
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu des onglets */}
            <div className="overflow-hidden">
              {activeTab === 'rules' ? (
                // Liste des règles d'alerte
                filteredAlerts.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Règle d'alerte
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Statut
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Projet
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Équipe
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredAlerts.map(rule => (
                          <tr key={rule.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-start">
                                <div className="mr-3 mt-1">
                                  {getTypeIcon(rule.type)}
                                </div>
                                <div>
                                  <div className="font-medium text-indigo-600 hover:text-indigo-900 cursor-pointer">
                                    {rule.name}
                                  </div>
                                  <div className="text-sm text-gray-500 mt-1">
                                    {rule.description}
                                  </div>
                                  <div className="text-xs text-gray-400 mt-1">
                                    {formatLastTriggered(rule.lastTriggered)}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {getStatusIcon(rule.status)}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProjectIcon(rule.project)}`}>
                                <Code className="h-3 w-3 mr-1" />
                                {rule.project}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="h-6 w-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                                  <span className="text-xs font-medium text-indigo-600">
                                    {rule.team.charAt(0)}
                                  </span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{rule.team}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="relative">
                                <button
                                  onClick={() => setShowActionMenu(showActionMenu === rule.id ? null : rule.id)}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <MoreHorizontal className="h-4 w-4 text-gray-500" />
                                </button>
                                {showActionMenu === rule.id && (
                                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                    <button
                                      onClick={() => handleAction('edit', rule.id)}
                                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                      <Edit className="h-4 w-4 mr-2" />
                                      Éditer
                                    </button>
                                    <button
                                      onClick={() => handleAction('duplicate', rule.id)}
                                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                      <Copy className="h-4 w-4 mr-2" />
                                      Dupliquer
                                    </button>
                                    <button
                                      onClick={() => handleAction('delete', rule.id)}
                                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Supprimer
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune règle d'alerte trouvée</h3>
                    <p className="text-gray-500 mb-6">
                      {searchQuery || alertTypeFilter !== 'Tous' || teamFilter !== 'Toutes les équipes' || projectFilter !== 'Tous les projets'
                        ? 'Essayez de modifier vos filtres de recherche.'
                        : 'Commencez par créer votre première règle d\'alerte.'
                      }
                    </p>
                    <button 
                      onClick={handleCreateAlert}
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Créer une alerte
                    </button>
                  </div>
                )
              ) : (
                // Historique des alertes
                filteredHistory.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Alerte
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Statut
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Gravité
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Déclenché le
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Résolu le
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredHistory.map(alert => (
                          <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                           <td className="px-6 py-4">
                              <div className="flex items-start">
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900">
                                    {alert.ruleName}
                                  </div>
                                  <div className="text-sm text-gray-500 mt-1">
                                    {alert.message}
                                  </div>
                                  <div className="flex items-center mt-2">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProjectIcon(alert.project)}`}>
                                      <Code className="h-3 w-3 mr-1" />
                                      {alert.project}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {getHistoryStatusIcon(alert.status)}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                                {alert.severity === 'high' && <AlertTriangle className="h-3 w-3 mr-1" />}
                                {alert.severity === 'medium' && <Clock className="h-3 w-3 mr-1" />}
                                {alert.severity === 'low' && <Check className="h-3 w-3 mr-1" />}
                                {alert.severity}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">
                                {formatHistoryDate(alert.triggeredAt)}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">
                                {alert.resolvedAt ? formatHistoryDate(alert.resolvedAt) : '-'}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun historique d'alerte</h3>
                    <p className="text-gray-500">
                      {searchQuery || projectFilter !== 'Tous les projets'
                        ? 'Aucune alerte ne correspond à vos critères de recherche.'
                        : 'L\'historique des alertes déclenchées apparaîtra ici.'
                      }
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Modal de création/édition d'alerte */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingRule ? 'Éditer la règle d\'alerte' : 'Créer une nouvelle règle d\'alerte'}
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de la règle
                  </label>
                  <input
                    type="text"
                    value={alertForm.name}
                    onChange={(e) => setAlertForm(prev => ({...prev, name: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Nom de votre règle d'alerte"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={alertForm.description}
                    onChange={(e) => setAlertForm(prev => ({...prev, description: e.target.value}))}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Description de votre règle d'alerte"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Projet
                    </label>
                    <select
                      value={alertForm.project}
                      onChange={(e) => setAlertForm(prev => ({...prev, project: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      {projects.slice(1).map(project => (
                        <option key={project} value={project}>{project}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Équipe
                    </label>
                    <select
                      value={alertForm.team}
                      onChange={(e) => setAlertForm(prev => ({...prev, team: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      {teams.slice(1).map(team => (
                        <option key={team} value={team}>{team}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type d'alerte
                    </label>
                    <select
                      value={alertForm.type}
                      onChange={(e) => setAlertForm(prev => ({...prev, type: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      {alertTypes.slice(1).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Statut
                    </label>
                    <select
                      value={alertForm.status}
                      onChange={(e) => setAlertForm(prev => ({...prev, status: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveAlert}
                  disabled={!alertForm.name.trim()}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {editingRule ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de feedback */}
        {showFeedbackModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Donner votre avis
                </h3>
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de feedback
                  </label>
                  <select
                    value={feedbackForm.type}
                    onChange={(e) => setFeedbackForm(prev => ({...prev, type: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="suggestion">Suggestion</option>
                    <option value="bug">Signaler un bug</option>
                    <option value="feature">Demande de fonctionnalité</option>
                    <option value="general">Commentaire général</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Évaluation (1-5 étoiles)
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => setFeedbackForm(prev => ({...prev, rating: star}))}
                        className={`p-1 ${star <= feedbackForm.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                      >
                        <Star className="h-6 w-6 fill-current" />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {feedbackForm.rating}/5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={feedbackForm.message}
                    onChange={(e) => setFeedbackForm(prev => ({...prev, message: e.target.value}))}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Partagez votre feedback avec nous..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSendFeedback}
                  disabled={!feedbackForm.message.trim()}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
