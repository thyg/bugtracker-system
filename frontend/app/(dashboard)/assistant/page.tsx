"use client"

import React, { useState, useEffect, useRef } from "react"
import { 
  User, 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  FileText, 
  Code, 
  Database, 
  Bug, 
  Lightbulb, 
  Calendar, 
  Clock, 
  Trash2, 
  Download, 
  Copy, 
  RefreshCw, 
  Zap, 
  Brain, 
  Sparkles, 
  Target, 
  TrendingUp,
  BarChart3,
  Shield,
  Globe,
  Smartphone,
  Monitor,
  Activity,
  Archive,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Share,
  Bookmark,
  Filter,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Square,
  RotateCcw,
  Save,
  Upload,
  Image,
  Paperclip,
  Smile,
  Command
} from "lucide-react"

// Données utilisateur (reprises du fichier original)
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
      location: "Douala, Cameroun",
      preferences: {
        language: "fr",
        theme: "light",
        notifications: true,
        voiceEnabled: true
      }
    },
    {
      id: 2,
      name: "Solange Nguimfack",
      email: "solange.nguimfack@camtech.cm",
      role: "Ingénieure DevOps",
      department: "Infrastructure & Cloud",
      joinDate: "2021-07-12",
      lastLogin: new Date(Date.now() - 2 * 3600000).toISOString(),
      avatar: null,
      skills: ["Linux", "Docker", "CI/CD", "AWS"],
      reportsCount: 54,
      bugsResolved: 278,
      avgResolutionTime: "1.6h",
      status: "Actif",
      location: "Yaoundé, Cameroun",
      preferences: {
        language: "fr",
        theme: "dark",
        notifications: true,
        voiceEnabled: false
      }
    },
    {
      id: 3,
      name: "Fabrice Nkoue",
      email: "fabrice.nkoue@camtech.cm",
      role: "Testeur QA",
      department: "Qualité Logicielle",
      joinDate: "2023-01-15",
      lastLogin: new Date(Date.now() - 86400000).toISOString(),
      avatar: null,
      skills: ["Cypress", "Jest", "Postman"],
      reportsCount: 89,
      bugsResolved: 159,
      avgResolutionTime: "3.2h",
      status: "Actif",
      location: "Bafoussam, Cameroun",
      preferences: {
        language: "fr",
        theme: "light",
        notifications: false,
        voiceEnabled: true
      }
    }
  ]

  return users[Math.floor(Math.random() * users.length)]
}

// Suggestions d'assistant par catégorie
const assistantSuggestions = {
  "Développement": [
    "Comment optimiser les performances de mon application React ?",
    "Aide-moi à déboguer cette erreur SQL",
    "Explique-moi les meilleures pratiques Laravel",
    "Comment mettre en place un système de cache efficace ?"
  ],
  "DevOps": [
    "Comment configurer un pipeline CI/CD ?",
    "Aide-moi à optimiser mon Dockerfile",
    "Explique-moi la surveillance des applications",
    "Comment gérer les secrets en production ?"
  ],
  "Tests": [
    "Comment écrire des tests unitaires efficaces ?",
    "Aide-moi à automatiser mes tests E2E",
    "Explique-moi les stratégies de test",
    "Comment tester une API REST ?"
  ],
  "Sécurité": [
    "Comment sécuriser mon application web ?",
    "Aide-moi à implémenter l'authentification JWT",
    "Explique-moi les vulnérabilités OWASP",
    "Comment chiffrer les données sensibles ?"
  ],
  "Architecture": [
    "Comment concevoir une architecture microservices ?",
    "Aide-moi à choisir entre SQL et NoSQL",
    "Explique-moi les patterns de design",
    "Comment gérer la scalabilité ?"
  ]
}

// Réponses simulées de l'assistant
const generateAssistantResponse = (message) => {
  const responses = {
    "performance": "Pour optimiser les performances de votre application React, je recommande : 1) Utilisez React.memo() pour éviter les re-rendus inutiles, 2) Implémentez le lazy loading avec React.lazy(), 3) Optimisez vos bundles avec code splitting, 4) Utilisez useMemo() et useCallback() pour les calculs coûteux.",
    "sql": "Pour déboguer une erreur SQL, voici ma méthode : 1) Analysez le message d'erreur complet, 2) Vérifiez la syntaxe de votre requête, 3) Testez avec des données simplifiées, 4) Utilisez EXPLAIN pour comprendre l'exécution, 5) Vérifiez les contraintes et les index.",
    "laravel": "Les meilleures pratiques Laravel incluent : 1) Suivez les conventions de nommage, 2) Utilisez les Eloquent relationships correctement, 3) Implémentez la validation avec Form Requests, 4) Utilisez les Jobs pour les tâches longues, 5) Gérez les erreurs avec try-catch.",
    "cache": "Pour un système de cache efficace : 1) Utilisez Redis pour les données fréquemment consultées, 2) Implémentez une stratégie de cache multi-niveaux, 3) Définissez des TTL appropriés, 4) Utilisez le cache-aside pattern, 5) Monitorer les hit/miss ratios.",
    "cicd": "Pour configurer un pipeline CI/CD : 1) Automatisez les tests à chaque commit, 2) Utilisez des environnements de staging, 3) Implémentez le déploiement blue-green, 4) Configurez des rollbacks automatiques, 5) Surveillez les métriques de déploiement.",
    "default": "Je suis votre assistant technique personnel. Je peux vous aider avec le développement, les tests, la sécurité, DevOps et l'architecture. Posez-moi une question spécifique pour obtenir une réponse détaillée et personnalisée."
  }

  const lowerMessage = message.toLowerCase()
  
  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return response
    }
  }
  
  return responses.default
}

export default function AssistantPage() {
  const [currentUser, setCurrentUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Développement")
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [conversation, setConversation] = useState([])
  const [settings, setSettings] = useState({
    voiceEnabled: true,
    autoSpeak: false,
    fontSize: "medium",
    theme: "light"
  })
  const [favorites, setFavorites] = useState([])
  const [history, setHistory] = useState([])
  
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const recognitionRef = useRef(null)
  const synthRef = useRef(null)

  // Initialisation
  useEffect(() => {
    const user = createRealUserData()
    setCurrentUser(user)
    setSettings(prev => ({
      ...prev,
      voiceEnabled: user.preferences.voiceEnabled,
      theme: user.preferences.theme
    }))
    
    // Message de bienvenue
    setMessages([
      {
        id: 1,
        type: "assistant",
        content: `Bonjour ${user.name} ! Je suis votre assistant technique personnel. Je peux vous aider avec vos projets de développement, résoudre des problèmes techniques, optimiser vos workflows et bien plus encore. Comment puis-je vous aider aujourd'hui ?`,
        timestamp: new Date().toISOString(),
        category: "Général"
      }
    ])
  }, [])

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Fonction de déconnexion
  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setCurrentUser(null)
      setMessages([])
      alert("Vous avez été déconnecté avec succès!")
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
      alert("Erreur lors de la déconnexion")
    } finally {
      setIsLoggingOut(false)
    }
  }

  // Fonction d'envoi de message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
      category: selectedCategory
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulation de la réponse de l'assistant
    setTimeout(() => {
      const assistantResponse = {
        id: Date.now() + 1,
        type: "assistant",
        content: generateAssistantResponse(inputMessage),
        timestamp: new Date().toISOString(),
        category: selectedCategory
      }

      setMessages(prev => [...prev, assistantResponse])
      setIsTyping(false)
      
      // Ajout à l'historique
      setHistory(prev => [...prev, { query: inputMessage, response: assistantResponse.content, timestamp: new Date().toISOString() }])
      
      // Synthèse vocale si activée
      if (settings.voiceEnabled && settings.autoSpeak) {
        speakMessage(assistantResponse.content)
      }
    }, 1000 + Math.random() * 2000)
  }

  // Reconnaissance vocale
  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Votre navigateur ne supporte pas la reconnaissance vocale")
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      const recognition = new window.webkitSpeechRecognition()
      recognition.lang = 'fr-FR'
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
      }

      recognitionRef.current = recognition
      recognition.start()
    }
  }

  // Synthèse vocale
  const speakMessage = (text) => {
    if (!('speechSynthesis' in window)) return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'fr-FR'
    utterance.rate = 0.9
    utterance.pitch = 1
    
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  // Gestion des suggestions
  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion)
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  // Gestion des favoris
  const toggleFavorite = (messageId) => {
    setFavorites(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    )
  }

  // Fonction utilitaire pour les initiales
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  // Fonction de copie
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copié dans le presse-papiers!")
    })
  }

  // Fonction d'export
  const exportConversation = () => {
    const conversation = messages.map(msg => ({
      type: msg.type,
      content: msg.content,
      timestamp: msg.timestamp
    }))
    
    const blob = new Blob([JSON.stringify(conversation, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `conversation_${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  // Fonction de reset
  const resetConversation = () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser la conversation ?")) {
      setMessages([
        {
          id: 1,
          type: "assistant",
          content: `Bonjour ${currentUser?.name} ! Comment puis-je vous aider aujourd'hui ?`,
          timestamp: new Date().toISOString(),
          category: "Général"
        }
      ])
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'assistant...</p>
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
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Assistant IA</h1>
                <p className="text-xs text-gray-500">Votre assistant technique personnel</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Statistiques utilisateur */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">{getInitials(currentUser.name)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{currentUser.name}</h3>
                  <p className="text-sm text-gray-600">{currentUser.role}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600">En ligne</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Conversations</span>
                  <span className="text-sm font-bold text-gray-900">{messages.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Favoris</span>
                  <span className="text-sm font-bold text-gray-900">{favorites.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Historique</span>
                  <span className="text-sm font-bold text-gray-900">{history.length}</span>
                </div>
              </div>
            </div>

            {/* Catégories */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Catégories</h3>
              <div className="space-y-2">
                {Object.keys(assistantSuggestions).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={exportConversation}
                  className="w-full px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Exporter
                </button>
                <button
                  onClick={resetConversation}
                  className="w-full px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Réinitialiser
                </button>
                <button
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className="w-full px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  Suggestions
                </button>
              </div>
            </div>
          </div>

          {/* Zone de chat principale */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 h-[calc(100vh-12rem)] flex flex-col">
              {/* Header du chat */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Assistant IA</h2>
                      <p className="text-sm text-gray-500">Spécialisé en {selectedCategory}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, voiceEnabled: !prev.voiceEnabled }))}
                      className={`p-2 rounded-lg transition-colors ${
                        settings.voiceEnabled
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-gray-50 text-gray-400'
                      }`}
                    >
                      {settings.voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-3xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}>
                          {message.type === 'user' ? (
                            <span className="text-white text-sm font-bold">
                              {getInitials(currentUser.name)}
                            </span>
                          ) : (
                            <Brain className="w-4 h-4 text-white" />
                          )}
                        </div>
                        
                        <div className={`flex-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                          <div className={`inline-block px-6 py-4 rounded-2xl ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                              : 'bg-gray-50 text-gray-900'
                          }`}>
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          </div>
                          
                          <div className={`flex items-center gap-2 mt-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <span className="text-xs text-gray-500">
                              {new Date(message.timestamp).toLocaleTimeString('fr-FR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                            
                            {message.type === 'assistant' && (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => toggleFavorite(message.id)}
                                  className={`p-1 rounded transition-colors ${
                                    favorites.includes(message.id)
                                      ? 'text-yellow-500 hover:text-yellow-600'
                                      : 'text-gray-400 hover:text-gray-600'
                                  }`}
                                >
                                  <Star className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => copyToClipboard(message.content)}
                                  className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                                {settings.voiceEnabled && (
                                  <button
                                    onClick={() => speakMessage(message.content)}
                                    className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                                  >
                                    <Volume2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-50 px-6 py-4 rounded-2xl">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {showSuggestions && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">Suggestions pour {selectedCategory}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {assistantSuggestions[selectedCategory].map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-left p-3 bg-white rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-colors text-sm text-gray-700 hover:text-blue-700"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Zone de saisie */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <textarea
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        placeholder="Tapez votre message ici... (Entrée pour envoyer, Shift+Entrée pour une nouvelle ligne)"
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none overflow-hidden"
                        rows="1"
                        style={{ minHeight: '48px', maxHeight: '120px' }}
                      />
                      <div className="absolute right-3 bottom-3 flex items-center gap-2">
                        <button
                          type="button"
                          className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                        >
                          <Paperclip className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                        >
                          <Smile className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {settings.voiceEnabled && (
                      <button
                        onClick={toggleListening}
                        disabled={isListening}
                        className={`p-3 rounded-xl transition-colors ${
                          isListening
                            ? 'bg-red-500 text-white animate-pulse'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </button>
                    )}
                    
                    {isSpeaking && (
                      <button
                        onClick={stopSpeaking}
                        className="p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
                      >
                        <Square className="w-5 h-5" />
                      </button>
                    )}
                    
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Indicateurs d'état */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {isListening && (
                      <span className="flex items-center gap-1 text-red-500">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        Écoute en cours...
                      </span>
                    )}
                    {isSpeaking && (
                      <span className="flex items-center gap-1 text-orange-500">
                        <Volume2 className="w-3 h-3" />
                        Lecture audio...
                      </span>
                    )}
                    {isTyping && (
                      <span className="flex items-center gap-1 text-blue-500">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        L'assistant tape...
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{inputMessage.length} caractères</span>
                    {settings.voiceEnabled && (
                      <span className="flex items-center gap-1">
                        <Mic className="w-3 h-3" />
                        Vocal activé
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>© 2024 CamTech Assistant IA</span>
              <span>•</span>
              <span>Version 2.0</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-green-500" />
                Système opérationnel
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-blue-500" />
                Sécurisé
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}