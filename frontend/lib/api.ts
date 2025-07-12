import type { Project, Issue, User } from "@/types"
import { mockProjects, mockIssues, mockChartData } from "@/lib/mock-data"

// lib/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // On utilise la variable définie à l'étape 1.1
  headers: {
    'Content-Type': 'application/json',
  },
});

// Plus tard, nous ajouterons ici un "intercepteur" pour le token JWT.
// Pour l'instant, c'est suffisant.

export default apiClient;







//*/*   Session de simulations */ */



// Simulation d'un délai réseau
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Types pour les réponses API
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Simulation d'erreurs aléatoires
const shouldSimulateError = () => Math.random() < 0.1 // 10% de chance d'erreur

// API Projects
export const projectsApi = {
  async getAll(): Promise<ApiResponse<Project[]>> {
    await delay(800)

    if (shouldSimulateError()) {
      throw new Error("Erreur de connexion au serveur")
    }

    return {
      data: mockProjects,
      success: true,
    }
  },

  async getById(id: string): Promise<ApiResponse<Project>> {
    await delay(600)

    const project = mockProjects.find((p) => p.id === id)
    if (!project) {
      throw new Error("Projet non trouvé")
    }

    return {
      data: project,
      success: true,
    }
  },

  async create(project: Omit<Project, "id">): Promise<ApiResponse<Project>> {
    await delay(1000)

    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    }

    return {
      data: newProject,
      success: true,
      message: "Projet créé avec succès",
    }
  },

  async update(id: string, updates: Partial<Project>): Promise<ApiResponse<Project>> {
    await delay(800)

    const project = mockProjects.find((p) => p.id === id)
    if (!project) {
      throw new Error("Projet non trouvé")
    }

    const updatedProject = { ...project, ...updates }
    return {
      data: updatedProject,
      success: true,
      message: "Projet mis à jour avec succès",
    }
  },

  async delete(id: string): Promise<ApiResponse<null>> {
    await delay(600)

    return {
      data: null,
      success: true,
      message: "Projet supprimé avec succès",
    }
  },
}

// API Issues
export const issuesApi = {
  async getAll(params?: {
    page?: number
    limit?: number
    status?: string
    level?: string
    project?: string
  }): Promise<PaginatedResponse<Issue>> {
    await delay(700)

    if (shouldSimulateError()) {
      throw new Error("Erreur lors du chargement des issues")
    }

    const { page = 1, limit = 10, status, level, project } = params || {}

    let filteredIssues = [...mockIssues]

    // Filtrage
    if (status) {
      filteredIssues = filteredIssues.filter((issue) => issue.status === status)
    }
    if (level) {
      filteredIssues = filteredIssues.filter((issue) => issue.level === level)
    }
    if (project) {
      filteredIssues = filteredIssues.filter((issue) => issue.project === project)
    }

    // Pagination
    const total = filteredIssues.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedIssues = filteredIssues.slice(startIndex, endIndex)

    return {
      data: paginatedIssues,
      success: true,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    }
  },

  async getById(id: string): Promise<ApiResponse<Issue>> {
    await delay(500)

    const issue = mockIssues.find((i) => i.id === id)
    if (!issue) {
      throw new Error("Issue non trouvée")
    }

    return {
      data: issue,
      success: true,
    }
  },

  async updateStatus(id: string, status: Issue["status"]): Promise<ApiResponse<Issue>> {
    await delay(600)

    const issue = mockIssues.find((i) => i.id === id)
    if (!issue) {
      throw new Error("Issue non trouvée")
    }

    const updatedIssue = { ...issue, status }
    return {
      data: updatedIssue,
      success: true,
      message: "Statut mis à jour avec succès",
    }
  },
}

// API Analytics
export const analyticsApi = {
  async getErrorStats(timeRange: "7d" | "30d" | "90d" = "7d"): Promise<ApiResponse<typeof mockChartData.errors>> {
    await delay(900)

    return {
      data: mockChartData.errors,
      success: true,
    }
  },

  async getPerformanceStats(): Promise<ApiResponse<typeof mockChartData.performance>> {
    await delay(700)

    return {
      data: mockChartData.performance,
      success: true,
    }
  },

  async getDashboardStats(): Promise<
    ApiResponse<{
      totalErrors: number
      activeProjects: number
      resolvedIssues: number
      teamMembers: number
    }>
  > {
    await delay(600)

    return {
      data: {
        totalErrors: 497,
        activeProjects: 12,
        resolvedIssues: 234,
        teamMembers: 24,
      },
      success: true,
    }
  },
}

// API Auth
export const authApi = {
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    await delay(1200)

    // Simulation d'une vérification d'identifiants
    if (email === "admin@example.com" && password === "password") {
      const user: User = {
        id: "1",
        email,
        name: "Administrateur",
        role: "admin",
        avatar: "/placeholder.svg?height=40&width=40",
      }

      return {
        data: {
          user,
          token: "mock-jwt-token-" + Date.now(),
        },
        success: true,
        message: "Connexion réussie",
      }
    }

    throw new Error("Identifiants invalides")
  },

  async register(email: string, password: string, name: string): Promise<ApiResponse<{ user: User; token: string }>> {
    await delay(1500)

    const user: User = {
      id: Date.now().toString(),
      email,
      name,
      role: "member",
      avatar: "/placeholder.svg?height=40&width=40",
    }

    return {
      data: {
        user,
        token: "mock-jwt-token-" + Date.now(),
      },
      success: true,
      message: "Compte créé avec succès",
    }
  },

  async logout(): Promise<ApiResponse<null>> {
    await delay(300)

    return {
      data: null,
      success: true,
      message: "Déconnexion réussie",
    }
  },
}
