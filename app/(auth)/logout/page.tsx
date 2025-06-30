"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { LogOut, ArrowLeft, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"

export default function LogoutPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  // Rediriger si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      // Redirection vers la page de connexion après déconnexion
      router.push("/login")
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const handleCancel = () => {
    router.back() // Retourner à la page précédente
  }

  // Ne pas afficher la page si l'utilisateur n'est pas connecté
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <LogOut className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Déconnexion
            </CardTitle>
            <CardDescription className="text-center">
              {user?.name ? `Êtes-vous sûr de vouloir vous déconnecter, ${user.name} ?` : "Êtes-vous sûr de vouloir vous déconnecter ?"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {user && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            <Separator />

            <div className="space-y-3">
              <Button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                size="lg"
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Déconnexion en cours...
                  </>
                ) : (
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                    Confirmer la déconnexion
                  </>
                )}
              </Button>

              <Button
                onClick={handleCancel}
                variant="outline"
                className="w-full"
                size="lg"
                disabled={isLoggingOut}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Annuler
              </Button>
            </div>

            <Separator />

            <div className="text-center">
              <Link
                href="/dashboard"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Retourner au tableau de bord
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Vous serez redirigé vers la page de connexion après déconnexion
          </p>
        </div>
      </div>
    </div>
  )
}