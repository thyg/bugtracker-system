"use client"

import { useState } from "react"
import { Link, Settings, Shield, Zap, Github, Slack, Calendar, Mail, Database, Cloud, Webhook, Key, Plus, Check, X, ExternalLink, Loader2, Copy, Eye, EyeOff, Trash2 } from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  category: 'productivity' | 'communication' | 'development' | 'storage' | 'analytics'
  status: 'connected' | 'available' | 'coming_soon'
  connectedAt?: string
  permissions?: string[]
  settings?: {
    webhookUrl?: string
    apiKey?: string
  }
}

interface ApiKey {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string
}

interface Webhook {
  id: string
  name: string
  url: string
  status: 'active' | 'inactive'
  events: string[]
}

const mockIntegrations: Integration[] = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Synchronisez vos dépôts et gérez vos projets de développement',
    icon: <Github className="w-6 h-6" />,
    category: 'development',
    status: 'connected',
    connectedAt: '2023-03-15',
    permissions: ['Lecture des dépôts', 'Écriture des issues', 'Webhooks']
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Recevez des notifications et collaborez avec votre équipe',
    icon: <Slack className="w-6 h-6" />,
    category: 'communication',
    status: 'connected',
    connectedAt: '2023-02-20',
    permissions: ['Envoi de messages', 'Lecture des canaux']
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Synchronisez vos événements et gérez votre emploi du temps',
    icon: <Calendar className="w-6 h-6" />,
    category: 'productivity',
    status: 'available'
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Gérez vos campagnes email et listes de contacts',
    icon: <Mail className="w-6 h-6" />,
    category: 'communication',
    status: 'available'
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Accédez à vos fichiers et documents cloud',
    icon: <Cloud className="w-6 h-6" />,
    category: 'storage',
    status: 'available'
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Synchronisez vos bases de données et documents',
    icon: <Database className="w-6 h-6" />,
    category: 'productivity',
    status: 'coming_soon'
  }
]

const mockWebhooks: Webhook[] = [
  {
    id: '1',
    name: 'Notifications projets',
    url: 'https://api.example.com/webhooks/projects',
    status: 'active',
    events: ['project.created', 'project.updated']
  },
  {
    id: '2',
    name: 'Alertes système',
    url: 'https://api.example.com/webhooks/alerts',
    status: 'inactive',
    events: ['system.error', 'system.warning']
  }
]

export default function SettingsIntegrations() {
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showWebhookModal, setShowWebhookModal] = useState(false)
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [webhookUrl, setWebhookUrl] = useState('')
  const [webhookName, setWebhookName] = useState('')
  const [newApiKeyName, setNewApiKeyName] = useState('')
  const [showApiKeys, setShowApiKeys] = useState<{[key: string]: boolean}>({})
  const [webhooks, setWebhooks] = useState<Webhook[]>(mockWebhooks)
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: '1', name: 'Production API', key: 'sk_live_1234567890abcdef', created: '2023-03-15', lastUsed: '2023-04-20' },
    { id: '2', name: 'Development API', key: 'sk_test_abcdef1234567890', created: '2023-02-10', lastUsed: '2023-04-19' }
  ])

  const toast = (options: {title: string, description: string}) => {
    // Simple toast implementation for demo
    alert(`${options.title}: ${options.description}`)
  }

  const handleConnect = async (integrationId: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      setIntegrations(prev =>
        prev.map(integration =>
          integration.id === integrationId
            ? { 
                ...integration, 
                status: 'connected', 
                connectedAt: new Date().toISOString().split('T')[0] 
              }
            : integration
        )
      )
      
      const integration = integrations.find(i => i.id === integrationId)
      toast({
        title: "Intégration connectée",
        description: `${integration?.name} a été connecté avec succès`,
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = async (integrationId: string) => {
    try {
      setIntegrations(prev =>
        prev.map(integration =>
          integration.id === integrationId
            ? { ...integration, status: 'available', connectedAt: undefined }
            : integration
        )
      )
      
      const integration = integrations.find(i => i.id === integrationId)
      toast({
        title: "Intégration déconnectée",
        description: `${integration?.name} a été déconnecté`,
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion",
      })
    }
  }

  const handleCreateWebhook = async () => {
    if (!webhookUrl || !webhookName) {
      toast({
        title: "Erreur",
        description: "Le nom et l'URL du webhook sont requis",
      })
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const newWebhook: Webhook = {
        id: Date.now().toString(),
        name: webhookName,
        url: webhookUrl,
        status: 'active',
        events: ['project.created']
      }
      setWebhooks(prev => [...prev, newWebhook])
      setWebhookUrl('')
      setWebhookName('')
      setShowWebhookModal(false)
      toast({
        title: "Webhook créé",
        description: "Le webhook a été configuré avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du webhook",
      })
    }
  }

  const handleCreateApiKey = async () => {
    if (!newApiKeyName) {
      toast({
        title: "Erreur",
        description: "Le nom de la clé API est requis",
      })
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const newApiKey: ApiKey = {
        id: Date.now().toString(),
        name: newApiKeyName,
        key: `sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
        created: new Date().toISOString().split('T')[0],
        lastUsed: 'Jamais utilisée'
      }
      setApiKeys(prev => [...prev, newApiKey])
      setNewApiKeyName('')
      setShowApiKeyModal(false)
      toast({
        title: "Clé API créée",
        description: "Votre nouvelle clé API a été générée avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de la clé API",
      })
    }
  }

  const handleDeleteApiKey = (apiKeyId: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== apiKeyId))
    toast({
      title: "Clé API supprimée",
      description: "La clé API a été supprimée avec succès",
    })
  }

  const handleDeleteWebhook = (webhookId: string) => {
    setWebhooks(prev => prev.filter(webhook => webhook.id !== webhookId))
    toast({
      title: "Webhook supprimé",
      description: "Le webhook a été supprimé avec succès",
    })
  }

  const toggleApiKeyVisibility = (keyId: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copié",
      description: "Le texte a été copié dans le presse-papiers",
    })
  }

  const categories = [
    { value: 'all', label: 'Toutes' },
    { value: 'productivity', label: 'Productivité' },
    { value: 'communication', label: 'Communication' },
    { value: 'development', label: 'Développement' },
    { value: 'storage', label: 'Stockage' },
    { value: 'analytics', label: 'Analytics' }
  ]

  const filteredIntegrations = integrations.filter(integration =>
    selectedCategory === 'all' || integration.category === selectedCategory
  )

  const getStatusBadge = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <span className="flex items-center px-2 py-1 text-xs rounded-full bg-green-100 text-green-800"><Check className="w-3 h-3 mr-1" />Connecté</span>
      case 'available':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Disponible</span>
      case 'coming_soon':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Bientôt disponible</span>
      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Intégrations</h1>
        <p className="text-gray-600 mt-1">
          Connectez vos outils favoris pour optimiser votre workflow.
        </p>
      </div>

      <div className="space-y-6">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Integrations grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <div key={integration.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-gray-600">{integration.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                    {getStatusBadge(integration.status)}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
              
              {integration.status === 'connected' && integration.connectedAt && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500">
                    Connecté le {new Date(integration.connectedAt).toLocaleDateString('fr-FR')}
                  </p>
                  {integration.permissions && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-1">Permissions:</p>
                      <div className="flex flex-wrap gap-1">
                        {integration.permissions.map((permission, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex justify-between items-center">
                {integration.status === 'connected' ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDisconnect(integration.id)}
                      className="flex items-center px-3 py-2 text-sm text-red-600 border border-red-200 rounded-md hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Déconnecter
                    </button>
                    <button className="flex items-center px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50">
                      <Settings className="w-4 h-4 mr-1" />
                      Configurer
                    </button>
                  </div>
                ) : integration.status === 'available' ? (
                  <button
                    onClick={() => handleConnect(integration.id)}
                    disabled={isLoading}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Link className="w-4 h-4 mr-2" />
                    )}
                    Connecter
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-100 text-gray-400 text-sm rounded-md cursor-not-allowed"
                  >
                    Bientôt disponible
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Webhooks section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Webhook className="w-5 h-5 mr-2" />
                Webhooks
              </h2>
              <p className="text-sm text-gray-600">
                Configurez des webhooks pour recevoir des notifications en temps réel
              </p>
            </div>
            <button
              onClick={() => setShowWebhookModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouveau webhook
            </button>
          </div>

          <div className="space-y-3">
            {webhooks.map((webhook) => (
              <div key={webhook.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                <div>
                  <h4 className="font-medium text-gray-900">{webhook.name}</h4>
                  <p className="text-sm text-gray-500">{webhook.url}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded ${
                      webhook.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {webhook.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                    <span className="text-xs text-gray-500">
                      Événements: {webhook.events.join(', ')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => copyToClipboard(webhook.url)}
                    className="text-gray-400 hover:text-gray-600"
                    title="Copier l'URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteWebhook(webhook.id)}
                    className="text-red-400 hover:text-red-600"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Keys section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Key className="w-5 h-5 mr-2" />
                Clés API
              </h2>
              <p className="text-sm text-gray-600">
                Gérez vos clés API pour accéder à notre plateforme
              </p>
            </div>
            <button
              onClick={() => setShowApiKeyModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle clé
            </button>
          </div>

          <div className="space-y-3">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{apiKey.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                      {showApiKeys[apiKey.id] ? apiKey.key : '••••••••••••••••'}
                    </code>
                    <button
                      onClick={() => toggleApiKeyVisibility(apiKey.id)}
                      className="text-gray-400 hover:text-gray-600"
                      title={showApiKeys[apiKey.id] ? "Masquer" : "Afficher"}
                    >
                      {showApiKeys[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => copyToClipboard(apiKey.key)}
                      className="text-gray-400 hover:text-gray-600"
                      title="Copier la clé"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span>Créée le {new Date(apiKey.created).toLocaleDateString('fr-FR')}</span>
                    <span>Dernière utilisation: {apiKey.lastUsed}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteApiKey(apiKey.id)}
                  className="text-red-400 hover:text-red-600 ml-4"
                  title="Supprimer la clé"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Webhook Modal */}
      {showWebhookModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Créer un nouveau webhook</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du webhook
                </label>
                <input
                  type="text"
                  value={webhookName}
                  onChange={(e) => setWebhookName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Notifications projets"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL du webhook
                </label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://votre-domaine.com/webhook"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowWebhookModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleCreateWebhook}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Créer une nouvelle clé API</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de la clé
                </label>
                <input
                  type="text"
                  value={newApiKeyName}
                  onChange={(e) => setNewApiKeyName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Production API"
                />
              </div>
              <div className="bg-yellow-50 p-3 rounded-md">
                <p className="text-sm text-yellow-800">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Cette clé aura accès complet à votre compte. Gardez-la en sécurité.
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleCreateApiKey}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Créer la clé
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}