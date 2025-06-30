"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import type { User } from "@/types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const isAuthenticated = !!user

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const checkAuth = () => {
      const token = document.cookie.includes("auth-token")
      const savedUser = localStorage.getItem("user")

      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          console.error("Erreur lors de la récupération de l'utilisateur:", error)
          logout()
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await authApi.login(email, password)
      const { user, token } = response.data

      // Stocker le token dans les cookies
      document.cookie = `auth-token=${token}; path=/; max-age=${7 * 24 * 60 * 60}` // 7 jours

      // Stocker l'utilisateur dans localStorage
      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)

      toast({
        title: "Connexion réussie",
        description: `Bienvenue ${user.name} !`,
      })
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      const response = await authApi.register(email, password, name)
      const { user, token } = response.data

      // Stocker le token dans les cookies
      document.cookie = `auth-token=${token}; path=/; max-age=${7 * 24 * 60 * 60}` // 7 jours

      // Stocker l'utilisateur dans localStorage
      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)

      toast({
        title: "Compte créé",
        description: `Bienvenue ${user.name} !`,
      })
    } catch (error) {
      toast({
        title: "Erreur lors de la création du compte",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await authApi.logout()

      // Supprimer le token des cookies
      document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"

      // Supprimer l'utilisateur du localStorage
      localStorage.removeItem("user")
      setUser(null)

      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      })
    } catch (error) {
      toast({
        title: "Erreur lors de la déconnexion",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
