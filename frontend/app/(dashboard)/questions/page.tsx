"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { MessageCircle, HelpCircle, Lightbulb, Star, Send, CheckCircle, AlertCircle, Clock, ThumbsUp, ThumbsDown, Filter, Search, Plus } from "lucide-react"

export default function UserFeedback() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('submit')
  const [formData, setFormData] = useState({
    type: 'question',
    subject: '',
    message: '',
    priority: 'medium',
    category: 'general'
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setFormData({
      type: 'question',
      subject: '',
      message: '',
      priority: 'medium',
      category: 'general'
    })
    
    // Afficher message de succès
    alert('Votre message a été envoyé avec succès!')
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const feedbackTypes = [
    { id: 'question', label: 'Question', icon: HelpCircle, color: 'blue', description: 'Posez une question technique ou fonctionnelle' },
    { id: 'suggestion', label: 'Suggestion', icon: Lightbulb, color: 'yellow', description: 'Proposez une amélioration ou nouvelle fonctionnalité' },
    { id: 'comment', label: 'Commentaire', icon: MessageCircle, color: 'green', description: 'Partagez votre expérience ou feedback général' },
    { id: 'bug', label: 'Signaler un Bug', icon: AlertCircle, color: 'red', description: 'Reportez un problème technique' }
  ]

  const categories = [
    'Général', 'Interface', 'Performance', 'Sécurité', 'Fonctionnalités', 'Documentation', 'API', 'Mobile'
  ]

  const priorities = [
    { id: 'low', label: 'Basse', color: 'green' },
    { id: 'medium', label: 'Moyenne', color: 'yellow' },
    { id: 'high', label: 'Haute', color: 'red' }
  ]

  // Données simulées des tickets précédents
  const previousTickets = [
    {
      id: 1,
      type: 'question',
      subject: 'Comment configurer les notifications?',
      status: 'resolved',
      date: '2024-01-15',
      responses: 3,
      rating: 5
    },
    {
      id: 2,
      type: 'suggestion',
      subject: 'Améliorer le dashboard mobile',
      status: 'in-progress',
      date: '2024-01-10',
      responses: 1,
      rating: null
    },
    {
      id: 3,
      type: 'bug',
      subject: 'Erreur lors du téléchargement',
      status: 'pending',
      date: '2024-01-08',
      responses: 0,
      rating: null
    }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'resolved': return 'text-green-600 bg-green-100'
      case 'in-progress': return 'text-blue-600 bg-blue-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusLabel = (status) => {
    switch(status) {
      case 'resolved': return 'Résolu'
      case 'in-progress': return 'En cours'
      case 'pending': return 'En attente'
      default: return 'Inconnu'
    }
  }

  const stats = [
    { label: 'Questions Posées', value: '12', icon: HelpCircle, color: 'blue' },
    { label: 'Suggestions Envoyées', value: '8', icon: Lightbulb, color: 'yellow' },
    { label: 'Tickets Résolus', value: '15', icon: CheckCircle, color: 'green' },
    { label: 'Temps Moyen Réponse', value: '2h', icon: Clock, color: 'purple' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Centre d'Aide & Feedback</h1>
          <p className="text-gray-600">Posez vos questions, partagez vos suggestions et aidez-nous à améliorer votre expérience</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('submit')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'submit'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Nouveau Message
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Clock className="w-4 h-4 inline mr-2" />
                Mes Messages
              </button>
            </nav>
          </div>

          {/* Submit Form */}
          {activeTab === 'submit' && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                {/* Type Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Quel type de message souhaitez-vous envoyer ?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {feedbackTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleInputChange('type', type.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          formData.type === type.id
                            ? `border-${type.color}-500 bg-${type.color}-50`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <type.icon className={`w-6 h-6 mb-2 ${
                          formData.type === type.id ? `text-${type.color}-600` : 'text-gray-600'
                        }`} />
                        <h4 className="font-medium text-gray-900">{type.label}</h4>
                        <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Catégorie
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priorité
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {priorities.map(priority => (
                          <option key={priority.id} value={priority.id}>{priority.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Décrivez brièvement votre demande..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message détaillé
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Décrivez votre question, suggestion ou commentaire en détail..."
                      rows={6}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setFormData({
                        type: 'question',
                        subject: '',
                        message: '',
                        priority: 'medium',
                        category: 'general'
                      })}
                    >
                      Annuler
                    </button>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Envoyer</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="p-6">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher dans vos messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="in-progress">En cours</option>
                  <option value="resolved">Résolus</option>
                </select>
              </div>

              {/* Tickets List */}
              <div className="space-y-4">
                {previousTickets.map((ticket) => (
                  <div key={ticket.id} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                            {getStatusLabel(ticket.status)}
                          </span>
                          <span className="text-sm text-gray-500">#{ticket.id}</span>
                          <span className="text-sm text-gray-500">{ticket.date}</span>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-2">{ticket.subject}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{ticket.responses} réponse(s)</span>
                          {ticket.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{ticket.rating}/5</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {ticket.status === 'resolved' && !ticket.rating && (
                          <div className="flex space-x-1">
                            <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                              <ThumbsDown className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}