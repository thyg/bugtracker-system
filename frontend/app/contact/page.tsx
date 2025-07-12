"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ArrowLeft, 
  Loader2, 
  CheckCircle,
  MessageSquare,
  Users,
  Clock
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import { useToast } from "@/hooks/use-toast"

interface ContactForm {
  name: string
  email: string
  subject: string
  category: string
  message: string
  priority: string
}

export default function ContactTeamPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { user } = useAuth()
  const { t } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<ContactForm>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      subject: "",
      category: "",
      message: "",
      priority: "medium"
    }
  })

  const selectedCategory = watch("category")

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    try {
      // Simulation d'envoi du message
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log("Message envoyé:", data)
      
      setIsSubmitted(true)
      toast({
        title: "Message envoyé",
        description: "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
      })
      
      // Reset du formulaire après 3 secondes
      setTimeout(() => {
        setIsSubmitted(false)
        reset()
      }, 3000)
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "support@example.com",
      description: "Réponse sous 24h"
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "+237 6 56 91 28 97",
      description: "Lun-Ven 9h-18h"
    },
    {
      icon: MapPin,
      label: "Adresse",
      value: "64 Rue de la cité U, cameroun",
      description: "Siège social"
    }
  ]

  const categories = [
    { value: "support", label: "Support technique" },
    { value: "billing", label: "Facturation" },
    { value: "feature", label: "Demande de fonctionnalité" },
    { value: "bug", label: "Signaler un bug" },
    { value: "partnership", label: "Partenariat" },
    { value: "other", label: "Autre" }
  ]

  const priorities = [
    { value: "low", label: "Faible" },
    { value: "medium", label: "Moyenne" },
    { value: "high", label: "Élevée" },
    { value: "urgent", label: "Urgente" }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Message envoyé !</h3>
                <p className="text-gray-600 mt-2">
                  Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                </p>
              </div>
              <Button onClick={() => router.back()} className="w-full">
                Retour
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-100 rounded-full mb-4">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Contacter l'équipe</h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Vous avez une question, un problème ou une suggestion ? 
            Notre équipe est là pour vous aider. Contactez-nous et nous vous répondrons rapidement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations de contact */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Nos coordonnées
                </CardTitle>
                <CardDescription>
                  Plusieurs moyens de nous contacter
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                        <Icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{info.label}</p>
                        <p className="text-gray-600">{info.value}</p>
                        <p className="text-sm text-gray-500">{info.description}</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Temps de réponse */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Temps de réponse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-red-600 font-medium">Urgente</span>
                    <span className="text-gray-600">2-4 heures</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-600 font-medium">Élevée</span>
                    <span className="text-gray-600">4-8 heures</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-600 font-medium">Moyenne</span>
                    <span className="text-gray-600">24 heures</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600 font-medium">Faible</span>
                    <span className="text-gray-600">2-3 jours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envoyer un message</CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Nom et Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        {...register("name", { required: "Le nom est requis" })}
                        placeholder="Votre nom complet"
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email", { 
                          required: "L'email est requis",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Email invalide"
                          }
                        })}
                        placeholder="votre@email.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Catégorie et Priorité */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie *</Label>
                      <Select onValueChange={(value) => setValue("category", value)}>
                        <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input
                        type="hidden"
                        {...register("category", { required: "La catégorie est requise" })}
                      />
                      {errors.category && (
                        <p className="text-sm text-red-500">{errors.category.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priorité</Label>
                      <Select 
                        defaultValue="medium"
                        onValueChange={(value) => setValue("priority", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {priorities.map((priority) => (
                            <SelectItem key={priority.value} value={priority.value}>
                              {priority.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Sujet */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet *</Label>
                    <Input
                      id="subject"
                      {...register("subject", { required: "Le sujet est requis" })}
                      placeholder="Résumé de votre demande"
                      className={errors.subject ? "border-red-500" : ""}
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-500">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      {...register("message", { 
                        required: "Le message est requis",
                        minLength: {
                          value: 10,
                          message: "Le message doit contenir au moins 10 caractères"
                        }
                      })}
                      placeholder="Décrivez votre demande en détail..."
                      rows={6}
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Info selon la catégorie sélectionnée */}
                  {selectedCategory === "bug" && (
                    <Alert>
                      <AlertDescription>
                        Pour les bugs, merci d'inclure les étapes pour reproduire le problème, 
                        votre navigateur et système d'exploitation.
                      </AlertDescription>
                    </Alert>
                  )}

                  {selectedCategory === "support" && (
                    <Alert>
                      <AlertDescription>
                        Pour un support technique, merci de décrire précisément le problème rencontré 
                        et les actions déjà tentées.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Separator />

                  {/* Boutons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      disabled={isSubmitting}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Retour
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="sm:min-w-[140px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}