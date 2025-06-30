"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"
import { Camera, User, Mail, AtSign, FileText, Building, MapPin, Globe, Loader2 } from "lucide-react"

interface ProfileFormValues {
  name: string
  email: string
  username: string
  bio: string
  company: string
  location: string
  website: string
}

export function SettingsProfile() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      name: "John Doe",
      email: "john@example.com",
      username: "johndoe",
      bio: "Développeur full-stack passionné par la création d'applications web performantes et intuitives.",
      company: "Acme Inc.",
      location: "Paris, France",
      website: "https://johndoe.com",
    },
  })

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Erreur",
          description: "La taille de l'image ne doit pas dépasser 5MB",
        })
        return
      }

      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true)
    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Profil mis à jour",
        description: "Vos informations de profil ont été mises à jour avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Paramètres du profil</h1>
        <p className="text-gray-600 mt-1">
          Gérez vos informations personnelles et vos préférences de profil.
        </p>
      </div>

      <div className="space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {avatarPreview ? (
                <img 
                  src={avatarPreview} 
                  alt="Avatar preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Photo de profil</h3>
            <p className="text-sm text-gray-500">
              Choisissez une image pour votre profil. Taille maximale : 5MB.
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2" />
              Nom complet
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { 
                required: "Le nom est requis",
                minLength: {
                  value: 2,
                  message: "Le nom doit contenir au moins 2 caractères"
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Votre nom complet"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { 
                required: "L'email est requis",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Format d'email invalide"
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="votre@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <AtSign className="w-4 h-4 mr-2" />
              Nom d'utilisateur
            </label>
            <input
              id="username"
              type="text"
              {...register("username", { 
                required: "Le nom d'utilisateur est requis",
                pattern: {
                  value: /^[a-zA-Z0-9_-]+$/,
                  message: "Seuls les lettres, chiffres, - et _ sont autorisés"
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="nomutilisateur"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Building className="w-4 h-4 mr-2" />
              Entreprise
            </label>
            <input
              id="company"
              type="text"
              {...register("company")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nom de votre entreprise"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              Localisation
            </label>
            <input
              id="location"
              type="text"
              {...register("location")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ville, Pays"
            />
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Globe className="w-4 h-4 mr-2" />
              Site web
            </label>
            <input
              id="website"
              type="url"
              {...register("website", {
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "L'URL doit commencer par http:// ou https://"
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://votre-site.com"
            />
            {errors.website && (
              <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
            )}
          </div>
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 mr-2" />
            Biographie
          </label>
          <textarea
            id="bio"
            rows={4}
            {...register("bio", {
              maxLength: {
                value: 500,
                message: "La biographie ne doit pas dépasser 500 caractères"
              }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Parlez-nous de vous..."
          />
          {errors.bio && (
            <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Décrivez-vous en quelques mots (max. 500 caractères)
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Mise à jour...
              </>
            ) : (
              "Mettre à jour le profil"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}