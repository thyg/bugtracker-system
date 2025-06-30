"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, ThumbsUp, ThumbsDown, Flag, ArrowRight } from "lucide-react"

interface ProjectFeedbackProps {
  projectId: string
}

export function ProjectFeedback({ projectId }: ProjectFeedbackProps) {
  // Données simulées pour les feedbacks
  const feedbacks = [
    {
      id: "1",
      user: {
        name: "Sophie Martin",
        email: "sophie@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2024-01-14T15:30:00Z",
      message:
        "J'adore la nouvelle interface ! Beaucoup plus intuitive et rapide. Par contre, j'ai remarqué un petit bug lors de l'exportation des données en CSV.",
      sentiment: "positive",
      browser: "Chrome 120",
      os: "Windows 11",
      device: "Desktop",
    },
    {
      id: "2",
      user: {
        name: "Thomas Dubois",
        email: "thomas@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2024-01-13T09:45:00Z",
      message:
        "Le formulaire de contact ne fonctionne pas correctement sur mobile. Impossible d'envoyer un message après avoir rempli tous les champs.",
      sentiment: "negative",
      browser: "Safari 17",
      os: "iOS 17",
      device: "Mobile",
    },
    {
      id: "3",
      user: {
        name: "Emma Petit",
        email: "emma@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2024-01-12T14:20:00Z",
      message:
        "Serait-il possible d'ajouter une option pour trier les résultats par date ? Cela faciliterait beaucoup la navigation.",
      sentiment: "neutral",
      browser: "Firefox 121",
      os: "macOS 14",
      device: "Desktop",
    },
    {
      id: "4",
      user: {
        name: "Lucas Bernard",
        email: "lucas@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2024-01-10T11:15:00Z",
      message:
        "Application très performante et stable. Je l'utilise quotidiennement sans aucun problème. Merci pour votre travail !",
      sentiment: "positive",
      browser: "Edge 120",
      os: "Windows 10",
      device: "Desktop",
    },
  ]

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <Badge className="bg-green-500">Positif</Badge>
      case "negative":
        return <Badge variant="destructive">Négatif</Badge>
      case "neutral":
        return <Badge variant="secondary">Neutre</Badge>
      default:
        return <Badge variant="outline">{sentiment}</Badge>
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="h-4 w-4 text-green-500" />
      case "negative":
        return <ThumbsDown className="h-4 w-4 text-red-500" />
      default:
        return <MessageSquare className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Feedback utilisateurs</h2>
          <p className="text-muted-foreground">Commentaires et suggestions des utilisateurs</p>
        </div>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          Configurer le widget
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Commentaires récents
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {feedbacks.map((feedback, index) => (
              <div key={feedback.id}>
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={feedback.user.avatar || "/placeholder.svg"} alt={feedback.user.name} />
                    <AvatarFallback>{feedback.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-medium">{feedback.user.name}</span>
                        <span className="text-muted-foreground text-sm ml-2">
                          {new Date(feedback.date).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getSentimentIcon(feedback.sentiment)}
                        {getSentimentBadge(feedback.sentiment)}
                      </div>
                    </div>
                    <p className="text-sm">{feedback.message}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline">{feedback.browser}</Badge>
                      <Badge variant="outline">{feedback.os}</Badge>
                      <Badge variant="outline">{feedback.device}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Flag className="mr-1 h-3 w-3" />
                    Signaler
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Répondre
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                {index < feedbacks.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
