"use client"

import { useAuth } from "@/lib/auth-context"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link'
import {
  AlertTriangle,
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

export default function SupportPage() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const topArticles = [
    'FAQ Utilisateurs Camerounais',
    'Guide de démarrage rapide au Cameroun',
    'Transfert de projet: US → EU Org',
    'Comprendre Sentry pour Ngoa',
    'Facturation et devises locales (CFA)',
    'Modes de paiement au Cameroun',
    'Debugging avec Source Maps',
    'Meilleures pratiques Performance',
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    // TODO: intégrer la logique de recherche
    alert(`Recherche pour: ${query}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-green-700 text-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:opacity-90">
            Sentry CM
          </Link>
          <nav className="space-x-4">
            <Link href="/docs" className="hover:underline">Docs</Link>
            <Link href="/status" className="hover:underline">Status</Link>
            <Button variant="secondary" size="sm" onClick={() => router.push('/support/new')}>
              Soumettre une demande
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold">
            Besoin d'aide ?
          </h1>
          <p className="text-lg text-gray-600">
            Centralisez toutes vos ressources et contactez notre support local.
          </p>
        </div>

        {/* Search & AI */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            aria-label="Rechercher"
            placeholder="Tapez votre question ici..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="flex space-x-2">
            <Button type="submit">
              <Send className="mr-2 h-4 w-4" /> Rechercher
            </Button>
            <Button variant="outline">
              <Info className="mr-2 h-4 w-4 text-yellow-500" />
              Demander à l'AI
            </Button>
          </div>
        </form>

        <Separator className="my-12" />

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="mr-2 text-green-600" /> API & SDK
              </CardTitle>
            </CardHeader>
            <CardContent>
              Configurez Sentry pour vos applications React, Vue ou Angular.
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 text-green-600" /> Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              Découvrez comment surveiller et améliorer les performances.
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 text-green-600" /> Erreurs & Bugs
              </CardTitle>
            </CardHeader>
            <CardContent>
              Guide de résolution des erreurs fréquentes au Cameroun.
            </CardContent>
          </Card>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">Articles Populaires</h2>
          <ul className="space-y-2 list-disc list-inside">
            {topArticles.map((title, idx) => (
              <li key={idx}>
                <Link href="#" className="text-green-700 hover:underline">
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Separator className="my-12" />

        <div className="text-center space-y-3">
          <p>
            Support local: hotline +237 6 56 00 00 00 • email: support@sentry.cm
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="https://discord.gg/sentry">
              <Badge variant="outline">Discord</Badge>
            </Link>
            <Link href="https://www.youtube.com/sentry">
              <Badge variant="outline">YouTube</Badge>
            </Link>
            <Link href="/resources">
              <Badge variant="outline">Ressources</Badge>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
