export interface Project {
  id: string
  name: string
  platform: string
  status: "active" | "inactive" | "error"
  errorCount: number
  lastSeen: string
  team: string[]
}

export interface Issue {
  id: string
  title: string
  message: string
  level: "error" | "warning" | "info"
  status: "unresolved" | "resolved" | "ignored"
  count: number
  userCount: number
  firstSeen: string
  lastSeen: string
  assignee?: string
  project: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: "admin" | "member" | "viewer"
}

export interface Team {
  id: string
  name: string
  members: User[]
  projects: Project[]
}
