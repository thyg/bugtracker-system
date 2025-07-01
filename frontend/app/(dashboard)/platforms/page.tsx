"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { PlatformCard } from "@/components/platforms/platform-card"
import { platformsData } from "@/lib/platforms-data"

import { useRouter } from "next/navigation" // Pour app directory


export default function PlatformsPage() {

  // pour la navigation
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  const categories = ["Browser", "Server", "Mobile", "Desktop", "Serverless"]
  // const categories = ["Navigateur", "Serveur", "Mobile", "Bureau", "Sans serveur"]
  const popularPlatforms = platformsData.filter((platform) => platform.popular)

  const filteredPlatforms = platformsData.filter((platform) => {
    const matchesSearch = platform.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory ? platform.categories.includes(selectedCategory) : true
    return matchesSearch && matchesCategory
  })

  const handlePlatformSelect = (platformName: string) => {
    setSelectedPlatform(platformName === selectedPlatform ? null : platformName)
  }

  const handleContinue = () => {
    if (selectedPlatform) {
      // Navigate to next step or submit form
      // console.log(`Selected platform: ${selectedPlatform}`)
      router.push(`/platforms/${encodeURIComponent(selectedPlatform)}`)
    }
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Sélectionnez la plateforme que vous souhaitez surveiller</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Configurez un projet distinct pour chaque partie de votre application (par exemple, votre serveur API et votre client frontend), 
          pour identifier rapidement quelle partie de votre application génère les erreurs.
        </p>
      </motion.div>

      <div className="mb-8 space-y-6">
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filtrer les plateformes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Popular platforms */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Populaires</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {popularPlatforms.map((platform) => (
              <PlatformCard
                key={platform.name}
                platform={platform}
                isSelected={selectedPlatform === platform.name}
                onSelect={handlePlatformSelect}
              />
            ))}
          </div>
        </div>

        {/* All platforms */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Tous</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredPlatforms.map((platform) => (
              <PlatformCard
                key={platform.name}
                platform={platform}
                isSelected={selectedPlatform === platform.name}
                onSelect={handlePlatformSelect}
              />
            ))}
          </div>
          {filteredPlatforms.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Aucune plateforme ne correspond à vos critères de recherche.
            </div>
          )}
        </div>
      </div>

      {/* Continue button */}
      <div className="flex justify-end mt-8">
        <Button onClick={handleContinue} disabled={!selectedPlatform} className="px-6" size="lg">
          Continuer
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
