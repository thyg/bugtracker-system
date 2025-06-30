"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, Phone, Calendar, Shield, Trash2, AlertTriangle, Loader2 } from "lucide-react"

interface AccountFormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  language: string
  timezone: string
}

export function SettingsAccount() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormValues>({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+33 6 12 34 56 78",
      dateOfBirth: "1990-05-15",
      language: "fr",
      timezone: "Europe/Paris",
    },
  })

  const onSubmit = async (data: AccountFormValues) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast({
        title: "Compte mis à jour",
        description: "Vos informations de compte ont été mises à jour avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du compte",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "SUPPRIMER") {
      toast({
        title: "Erreur",
        description: "Veuillez taper 'SUPPRIMER' pour confirmer",
      })
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast({
        title: "Compte supprimé",
        description: "Votre compte a été supprimé avec succès.",
      })
      setShowDeleteModal(false)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du compte",
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Paramètres du compte</h1>
        <p className="text-gray-600 mt-1">
          Gérez vos informations personnelles et les paramètres de votre compte.
        </p>
      </div>

      <div className="space-y-6">
        {/* Informations personnelles */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Informations personnelles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom
              </label>
              <input
                type="text"
                {...register("firstName", { required: "Le prénom est requis" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom
              </label>
              <input
                type="text"
                {...register("lastName", { required: "Le nom est requis" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-2" />
                Adresse email
              </label>
              <input
                type="email"
                {...register("email", { 
                  required: "L'email est requis",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Format d'email invalide"
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-2" />
                Téléphone
              </label>
              <input
                type="tel"
                {...register("phone")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                Date de naissance
              </label>
              <input
                type="date"
                {...register("dateOfBirth")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Préférences */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Préférences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Langue
              </label>
              <select
                {...register("language")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fuseau horaire
              </label>
              <select
                {...register("timezone")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                <option value="America/New_York">America/New_York (GMT-5)</option>
                <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                <option value="Australia/Sydney">Australia/Sydney (GMT+10)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Supprimer le compte
          </button>

          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Mise à jour...
              </>
            ) : (
              "Sauvegarder les modifications"
            )}
          </button>
        </div>
      </div>

      {/* Modal de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">
                Supprimer le compte
              </h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              Cette action est irréversible. Toutes vos données seront définitivement supprimées.
            </p>
            
            <p className="text-sm text-gray-500 mb-4">
              Tapez <strong>SUPPRIMER</strong> pour confirmer :
            </p>
            
            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="SUPPRIMER"
            />
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setDeleteConfirmation("")
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Supprimer définitivement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}