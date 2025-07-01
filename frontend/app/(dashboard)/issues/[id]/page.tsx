"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"

import {
  AlertTriangle,
  AlertCircle,
  Info,
  ArrowLeft,
  User,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Code,
  BarChart3,
  Send,
} from "lucide-react"
import { formatDate } from "@/lib/utils"

interface Issue {
  id: string
  title: string
  message: string
  level: "error" | "warning" | "info"
  status: "unresolved" | "resolved" | "ignored"
  count: number
  userCount: number
  firstSeen: string
  lastSeen: string
  stackTrace?: string
  metadata?: Record<string, any>
  comments?: Comment[]
}

interface Comment {
  id: string
  content: string
  date: string
  user: {
    name: string
    avatar?: string
  }
}

export default function IssuePage() {
  const router = useRouter()
  const params = useParams()
  
  // FIX: Récupération correcte de l'ID depuis les paramètres
  const issueId = params?.id as string
  
  console.log("=== DIAGNOSTIC PARAMS ===")
  console.log("params:", params)
  console.log("issueId:", issueId)
  console.log("========================")
  
  const [activeTab, setActiveTab] = useState("details")
  const [comment, setComment] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  
  // États pour les données
  const [issue, setIssue] = useState<Issue | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // FIX: Utilisation des MÊMES données que dans la page de liste
  // Ces données doivent correspondre EXACTEMENT à celles de votre page de liste
  const mockIssuesDetailed: Issue[] = [
    {
      id: "1", // ✅ ID qui correspond à votre page de liste
      title: "TypeError: Cannot read property 'map' of undefined",
      message: "Erreur lors du rendu de la liste des utilisateurs",
      level: "error",
      status: "unresolved",
      count: 342,
      userCount: 23,
      firstSeen: "2024-01-10T08:30:00Z",
      lastSeen: "2024-01-15T14:22:00Z",
      stackTrace: `TypeError: Cannot read property 'map' of undefined
    at UserList.render (UserList.jsx:45:23)
    at processChild (/node_modules/react-dom/cjs/react-dom-server.node.development.js:3043:14)
    at resolve (/node_modules/react-dom/cjs/react-dom-server.node.development.js:2960:5)
    at ReactDOMServerRenderer.render (/node_modules/react-dom/cjs/react-dom-server.node.development.js:3435:22)
    at ReactDOMServerRenderer.read (/node_modules/react-dom/cjs/react-dom-server.node.development.js:3373:29)
    at renderToString (/node_modules/react-dom/cjs/react-dom-server.node.development.js:3988:27)`,
      metadata: {
        "URL": "/users",
        "Navigateur": "Chrome 118.0.0.0",
        "OS": "Windows 10",
        "Version de l'app": "1.2.3",
        "User Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      comments: [
        {
          id: "c1",
          content: "Cette erreur se produit quand l'API des utilisateurs ne retourne pas de données valides.",
          date: "2024-01-11T09:15:00Z",
          user: { name: "Jean Dupont", avatar: "" }
        },
        {
          id: "c2",
          content: "J'ai ajouté une vérification pour s'assurer que users est un tableau avant d'appeler map().",
          date: "2024-01-12T14:30:00Z",
          user: { name: "Marie Martin", avatar: "" }
        }
      ]
    },
    {
      id: "2", // ✅ ID qui correspond à votre page de liste
      title: "Failed to fetch user data",
      message: "Erreur de connexion à l'API utilisateur",
      level: "error",
      status: "unresolved",
      count: 156,
      userCount: 45,
      firstSeen: "2024-01-12T10:15:00Z",
      lastSeen: "2024-01-15T13:45:00Z",
      stackTrace: `Error: Failed to fetch user data
    at fetchUsers (api/users.js:12:15)
    at UserService.getUsers (services/UserService.js:23:8)
    at UserController.index (controllers/UserController.js:15:12)
    at Layer.handle [as handle_request] (express/lib/router/layer.js:95:5)
    at next (express/lib/router/route.js:137:13)
    at Route.dispatch (express/lib/router/route.js:112:3)`,
      metadata: {
        "Endpoint": "/api/users",
        "Méthode": "GET",
        "Code de statut": "500",
        "Temps de réponse": "5234ms",
        "IP du serveur": "192.168.1.100"
      },
      comments: [
        {
          id: "c3",
          content: "Le serveur de base de données semble avoir des problèmes de performance.",
          date: "2024-01-13T08:20:00Z",
          user: { name: "Pierre Durand", avatar: "" }
        }
      ]
    },
    {
      id: "3", // ✅ ID qui correspond à votre page de liste
      title: "Deprecated API endpoint used",
      message: "Utilisation d'un endpoint obsolète",
      level: "warning",
      status: "resolved",
      count: 89,
      userCount: 12,
      firstSeen: "2024-01-08T16:20:00Z",
      lastSeen: "2024-01-14T09:30:00Z",
      stackTrace: `Warning: Deprecated API endpoint used
    at makeRequest (api/client.js:45:10)
    at ProductService.getProducts (services/ProductService.js:18:5)
    at ProductController.index (controllers/ProductController.js:12:8)`,
      metadata: {
        "Endpoint obsolète": "/api/v1/products",
        "Nouveau endpoint": "/api/v2/products",
        "Date de dépréciation": "2023-12-01",
        "Date de suppression prévue": "2024-03-01"
      },
      comments: [
        {
          id: "c4",
          content: "Migration vers la v2 de l'API terminée.",
          date: "2024-01-14T10:00:00Z",
          user: { name: "Sophie Laurent", avatar: "" }
        }
      ]
    },
    {
      id: "4", // ✅ ID qui correspond à votre page de liste
      title: "Slow database query detected",
      message: "Requête de base de données prenant plus de 5 secondes",
      level: "warning",
      status: "unresolved",
      count: 234,
      userCount: 78,
      firstSeen: "2024-01-09T12:00:00Z",
      lastSeen: "2024-01-15T11:15:00Z",
      stackTrace: `Warning: Slow query detected (5.2s)
    at Database.query (db/connection.js:78:12)
    at OrderService.getOrders (services/OrderService.js:25:10)
    at OrderController.index (controllers/OrderController.js:18:7)`,
      metadata: {
        "Requête": "SELECT * FROM orders JOIN users ON orders.user_id = users.id WHERE orders.created_at > '2024-01-01'",
        "Temps d'exécution": "5.2s",
        "Nombre de lignes": "125000",
        "Base de données": "production",
        "Table": "orders"
      },
      comments: []
    },
    {
      id: "5", // ✅ ID qui correspond à votre page de liste
      title: "User session expired",
      message: "Session utilisateur expirée automatiquement",
      level: "info",
      status: "ignored",
      count: 1205,
      userCount: 234,
      firstSeen: "2024-01-05T09:00:00Z",
      lastSeen: "2024-01-15T14:50:00Z",
      stackTrace: `Info: User session expired
    at SessionManager.checkExpiration (auth/SessionManager.js:45:8)
    at AuthMiddleware.verify (middleware/AuthMiddleware.js:23:12)
    at Layer.handle [as handle_request] (express/lib/router/layer.js:95:5)`,
      metadata: {
        "Durée de session": "24h",
        "Type d'expiration": "Automatique",
        "Stratégie": "Glissement",
        "Dernière activité": "2024-01-15T14:50:00Z"
      },
      comments: [
        {
          id: "c5",
          content: "Comportement normal, on peut ignorer ces logs.",
          date: "2024-01-10T15:30:00Z",
          user: { name: "Admin Système", avatar: "" }
        }
      ]
    }
  ]

  // FIX: Fonction de chargement simplifiée
  const loadIssue = async () => {
    console.log("=== LOAD ISSUE ===")
    console.log("issueId dans loadIssue:", issueId)
    
    // FIX: Vérification simplifiée
    if (!issueId) {
      console.log("ID manquant")
      setError("ID d'issue manquant")
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Simulation d'un délai d'API
      await new Promise(resolve => setTimeout(resolve, 500))
      
      console.log("Recherche de l'issue avec ID:", issueId)
      console.log("IDs disponibles:", mockIssuesDetailed.map(i => i.id))
      
      // FIX: Recherche avec conversion de type pour être sûr
      const foundIssue = mockIssuesDetailed.find(issue => issue.id === String(issueId))
      
      console.log("Issue trouvée:", foundIssue)
      
      if (foundIssue) {
        setIssue(foundIssue)
      } else {
        setError(`Issue non trouvée pour l'ID: ${issueId}`)
      }
    } catch (err) {
      setError("Erreur lors du chargement de l'issue")
      console.error("Erreur:", err)
    } finally {
      setLoading(false)
    }
  }

  // FIX: useEffect simplifié
  useEffect(() => {
    if (issueId) {
      loadIssue()
    }
  }, [issueId])

  // FIX: Vérification simplifiée
  if (!issueId) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
            <h2 className="text-2xl font-bold mb-2">ID d'issue manquant</h2>
            <p className="text-muted-foreground mb-2">
              L'identifiant de l'issue n'est pas valide.
            </p>
            <Button onClick={() => router.push('/issues')}>
              Retour à la liste
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-muted p-4 rounded-md mb-4 text-sm font-mono">
          <p>Chargement en cours pour l'ID: {issueId}</p>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (error || !issue) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
            <h2 className="text-2xl font-bold mb-2">Issue non trouvée</h2>
            <p className="text-muted-foreground mb-2">
              {error || "Cette issue n'existe pas ou n'est plus disponible."}
            </p>
            <div className="bg-muted p-4 rounded-md mb-4 text-sm font-mono">
              <p>Diagnostic:</p>
              <p>• ID recherché: {issueId}</p>
              <p>• IDs disponibles: {mockIssuesDetailed.map(i => i.id).join(', ')}</p>
              <p>• Issue trouvée: {issue ? 'Oui' : 'Non'}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={loadIssue} variant="outline">
                Réessayer
              </Button>
              <Button onClick={() => router.push('/issues')}>
                Retour à la liste
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Helpers pour icônes et badges
  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error": return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "warning": return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "info": return <Info className="h-5 w-5 text-blue-500" />
      default: return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unresolved": return <Badge variant="destructive">Non résolu</Badge>
      case "resolved":   return <Badge variant="secondary">Résolu</Badge>
      case "ignored":    return <Badge variant="outline">Ignoré</Badge>
      default:            return <Badge>{status}</Badge>
    }
  }

  const handleStatusChange = async (status: string) => {
    if (isUpdating) return
    
    setIsUpdating(true)
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mise à jour locale de l'issue
      setIssue(prev => prev ? { ...prev, status: status as any } : null)
      
    } catch (err) {
      console.error("Erreur lors de la mise à jour du statut:", err)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleAddComment = async () => {
    if (!comment.trim()) return
    
    try {
      const newComment: Comment = {
        id: `c${Date.now()}`,
        content: comment.trim(),
        date: new Date().toISOString(),
        user: { name: "Utilisateur actuel" }
      }
      
      // Mise à jour locale
      setIssue(prev => prev ? {
        ...prev,
        comments: [...(prev.comments || []), newComment]
      } : null)
      
      setComment("")
      
    } catch (err) {
      console.error("Erreur lors de l'ajout du commentaire:", err)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Diagnostic info - À retirer en production */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-md text-sm">
        <p className="font-semibold text-green-800">✅ Issue chargée avec succès!</p>
        <p className="text-green-700">ID: {issueId} | Titre: {issue.title}</p>
      </div>

      {/* Bouton de retour */}
      <Button variant="ghost" onClick={() => router.push('/issues')} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux issues
      </Button>

      {/* En-tête de l'issue */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {getLevelIcon(issue.level)}
            <h1 className="text-2xl font-bold">{issue.title}</h1>
            {getStatusBadge(issue.status)}
          </div>
          <p className="text-muted-foreground">{issue.message}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              {issue.userCount} utilisateurs affectés
            </div>
            <div className="flex items-center">
              <AlertTriangle className="mr-1 h-4 w-4" />
              {issue.count} occurrences
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              Première: {formatDate(issue.firstSeen)}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              Dernière: {formatDate(issue.lastSeen)}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={issue.status === "resolved" ? "default" : "outline"}
            onClick={() => handleStatusChange("resolved")}
            disabled={isUpdating}
            className="flex items-center"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            {isUpdating ? "Mise à jour..." : "Résolu"}
          </Button>
          <Button
            variant={issue.status === "ignored" ? "default" : "outline"}
            onClick={() => handleStatusChange("ignored")}
            disabled={isUpdating}
            className="flex items-center"
          >
            <XCircle className="mr-2 h-4 w-4" />
            {isUpdating ? "Mise à jour..." : "Ignorer"}
          </Button>
        </div>
      </div>

      {/* Contenu de l'issue */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="details" className="flex items-center space-x-2">
            <Code className="w-4 h-4" />
            <span>Détails</span>
          </TabsTrigger>
          <TabsTrigger value="comments" className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Commentaires ({issue.comments?.length || 0})</span>
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Statistiques</span>
          </TabsTrigger>
        </TabsList>

        {/* Détails */}
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stack Trace</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                {issue.stackTrace || "Aucune stack trace disponible"}
              </pre>

              <Separator className="my-6" />

              {/* Informations supplémentaires dynamiques */}
              <div className="space-y-4">
                <h3 className="font-semibold">Informations supplémentaires</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {issue.metadata && Object.entries(issue.metadata).map(([key, value]) => (
                    <div key={key}>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">
                        {key}
                      </h4>
                      <p className="text-sm">{String(value)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Commentaires */}
        <TabsContent value="comments">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Commentaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {issue.comments && issue.comments.length > 0 ? (
                  issue.comments.map((c: Comment) => (
                    <div key={c.id} className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={c.user?.avatar} alt={c.user?.name} />
                        <AvatarFallback>{c.user?.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{c.user?.name || 'Utilisateur'}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(c.date)}
                          </span>
                        </div>
                        <p className="text-sm">{c.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Aucun commentaire pour le moment
                  </p>
                )}

                {/* Formulaire de nouveau commentaire */}
                <Separator className="my-4" />
                <div className="space-y-4">
                  <h3 className="font-semibold">Ajouter un commentaire</h3>
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        placeholder="Écrivez votre commentaire..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button 
                          disabled={!comment.trim()} 
                          onClick={handleAddComment}
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Envoyer
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistiques */}
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Occurrences totales</p>
                        <p className="text-3xl font-bold">{issue.count}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Utilisateurs affectés</p>
                        <p className="text-3xl font-bold">{issue.userCount}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Taux d'occurrence</p>
                        <p className="text-3xl font-bold">
                          {issue.userCount > 0 ? Math.round((issue.count / issue.userCount) * 100) / 100 : 0}%
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
