"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, AlertTriangle, BarChart3, Settings, Users, FolderOpen, ChevronLeft, ChevronRight,
  CheckCircle, TrendingUp, TrendingDown, Zap, Shield, Activity, Globe, Server, Eye,
  GitBranch, Bell, LayoutDashboard, List, Folder, Camera, FileText, BarChart, Table,
  Bot, Code2, HelpCircle, Search, Database, FileBarChart, Layers, CreditCard, RefreshCcw,
  Inbox, Lightbulb, Archive, Puzzle,


} from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import {  LogOut, User,  ChevronUp, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface UserFooterProps {
  isCollapsed: boolean
}

interface SidebarProps {
  className?: string
}

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

const navItems: NavItem[] = [
  {
    title: "Tableau de bord",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Projets",
    href: "/projects",
    icon: FolderOpen,
  },
  {
    title: "Problèmes",
    href: "/issues",
    icon: AlertTriangle,
    badge: 12,
  },
  {
    title: "Alertes",
    href: "/alertes",
    icon: Bell,
  },
  {
    title: "Performance",
    href: "/performance",
    icon: BarChart3,
  },
  {
    title: "Statistiques",
    href: "/stats",
    icon: BarChart,
  },
  {
    title: "Langage",
    href: "/platforms",
    icon: Code2,
  },
  {
    title: "Équipe",
    href: "/team",
    icon: Users,
  },
  
]


const navSecondaryItems: NavItem[] = [
   {
    title: "Paramètres",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Aide",
    href: "/help",
    icon: HelpCircle,
  },
  {
    title: "Questions",
    href: "/questions",
    icon: Inbox,
  },
  
  {
    title: "Versions",
    href: "/versions",
    icon: Archive,
  },

]

const navDocumentsItems: NavItem[] = [
 {
      title: "Bibliotheque",
      href: "/library",
      icon: Database,
    },
    {
      title: "Rapports",
      href: "/reports",
      icon: FileBarChart,
    },
    {
      title: "Assistance",
      href: "/assistant",
      icon: FileText,
    },
    {
      title: "Abonnements",
      href: "/abonnement",
      icon: CreditCard,
    },
    {
      title: "Mise à jour",
      href: "/update",
      icon: RefreshCcw,
    },
]



export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  const renderNavSection = (items: NavItem[], sectionTitle?: string) => (
    <div className="space-y-2">
      {!isCollapsed && sectionTitle && (
        <div className="px-3 py-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {sectionTitle}
          </h3>
        </div>
      )}
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground",
                isCollapsed && "justify-center",
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.title}</span>
                  {item.badge && (
                    <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )

  // La partie pour la gestion de l'utilisateur

  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      router.push("/login")
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const handleProfile = () => {
    router.push("/profile")
  }

  const handleBilling = () => {
    router.push("/Facturation")
  }

  const handleIntegrations = () => {
    router.push("/Integrations")
  }

  // Fonction pour obtenir les initiales de l'utilisateur
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2)
  }

  // Ne pas afficher si l'utilisateur n'est pas connecté
  if (!isAuthenticated || !user) {
    return null
  }


  return (
    <div
      className={cn(
        "relative flex flex-col bg-card border-r border-border transition-all duration-300 h-screen",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">BT</span>
            </div>
            <span className="font-bold text-lg">BUG-TRACKER</span>
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {/* Section principale */}
        {renderNavSection(navItems)}
        
        {/* Séparateur visuel */}
        <div className="border-t border-border my-4"></div>
        
        {/* Section secondaire */}
        {renderNavSection(navSecondaryItems, !isCollapsed ? "Outils" : undefined)}
        
        {/* Séparateur visuel */}
        <div className="border-t border-border my-4"></div>
        
        {/* Section documents */}
        {renderNavSection(navDocumentsItems, !isCollapsed ? "Documents" : undefined)}
      </nav>


      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2 h-auto hover:bg-accent"
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium text-primary">
                        {getInitials(user.name)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent 
              className="w-64" 
              align="end" 
              side="top"
              sideOffset={8}
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                  {user.role && (
                    <p className="text-xs leading-none text-muted-foreground capitalize">
                      {user.role}
                    </p>
                  )}
                </div>
              </DropdownMenuLabel>
              
              <DropdownMenuSeparator />

              {/** 
              <DropdownMenuItem onClick={handleProfile}>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              */}
              
              <DropdownMenuItem onClick={handleBilling}>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Facturation</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleIntegrations}>
                <Puzzle className="mr-2 h-4 w-4" />
                <span>Intégrations</span>
              </DropdownMenuItem>

              <ThemeToggle />
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                {isLoggingOut ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="mr-2 h-4 w-4" />
                )}
                <span>
                  {isLoggingOut ? "Déconnexion..." : "Se déconnecter"}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  )
}
