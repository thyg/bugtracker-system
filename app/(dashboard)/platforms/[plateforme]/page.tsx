"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { platformsData } from "@/lib/platforms-data"
import { configurationsPlateformes } from "@/lib/configurationsPlateformes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, ArrowLeft, ArrowRight, Globe, Server, Smartphone, Laptop, Zap, FileCode, Code, Layout } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PageConfigurationProps {
  plateformeSelectionnee?: string
  onRetour?: () => void
  onContinuer?: (config: any) => void
}

export default function ConfigurationPlateforme({ 
  plateformeSelectionnee, 
  onRetour, 
  onContinuer 
}: PageConfigurationProps = {}) {
  // Utilisation des paramètres URL si plateformeSelectionnee n'est pas fourni (mode standalone)
  const params = useParams()
  const nomPlateforme = plateformeSelectionnee || (params?.plateforme ? decodeURIComponent(params.plateforme as string) : null)
  
  const [configValues, setConfigValues] = useState<Record<string, string>>({})
  const [codesCopies, setCodesCopies] = useState<Record<string, boolean>>({})

  // Recherche dans platformsData d'abord, puis dans configurationsPlateformes
  const plateformeFromData = platformsData?.find(p => p.name === nomPlateforme)
  const configurationComplete = configurationsPlateformes[nomPlateforme || '']
  
  // Mode standalone (utilisation des données de platformsData)
  if (!plateformeSelectionnee && plateformeFromData && !configurationComplete) {
    const Icone = plateformeFromData.icon

    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Icone className="w-6 h-6 text-primary" />
          {plateformeFromData.name}
        </h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Catégories</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {plateformeFromData.categories.map((cat) => (
                <Badge key={cat}>{cat}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Popularité</h2>
            <p className={cn("mt-1", plateformeFromData.popular ? "text-green-600 font-medium" : "text-gray-500")}>
              {plateformeFromData.popular ? "Populaire" : "Moins populaire"}
            </p>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Configuration avancée</CardTitle>
              <CardDescription>
                La configuration détaillée pour {plateformeFromData.name} n'est pas encore disponible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cette plateforme est reconnue dans notre système, mais les instructions d'installation 
                et de configuration détaillées sont en cours de développement.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Configuration non trouvée
  if (!configurationComplete) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">Plateforme introuvable</h1>
        <p className="text-muted-foreground mb-6">
          Aucune information disponible pour la plateforme "{nomPlateforme}".
        </p>
        {onRetour && (
          <Button onClick={onRetour} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        )}
      </div>
    )
  }

  // Fonctions de gestion
  const gererChangementConfig = (nom: string, valeur: string) => {
    setConfigValues(prev => ({ ...prev, [nom]: valeur }))
  }

  const copierCode = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCodesCopies(prev => ({ ...prev, [id]: true }))
      setTimeout(() => {
        setCodesCopies(prev => ({ ...prev, [id]: false }))
      }, 2000)
    } catch (err) {
      console.error('Erreur lors de la copie:', err)
    }
  }

  const peutContinuer = configurationComplete.variables
    .filter(v => v.required)
    .every(v => configValues[v.nom]?.trim())

  const gererContinuer = () => {
    if (onContinuer) {
      onContinuer({
        plateforme: nomPlateforme,
        configuration: configValues
      })
    }
  }

  const IconePlateforme = configurationComplete.icone

  // Interface complète avec configuration détaillée
  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {onRetour && (
              <Button onClick={onRetour} variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                <IconePlateforme className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{configurationComplete.nom}</h1>
                <p className="text-muted-foreground">{configurationComplete.description}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {configurationComplete.categories.map(categorie => (
              <Badge key={categorie} variant="secondary">
                {categorie}
              </Badge>
            ))}
          </div>
        </div>

        <Tabs defaultValue="configuration" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="installation">Installation</TabsTrigger>
            <TabsTrigger value="exemples">Exemples</TabsTrigger>
          </TabsList>

          {/* Onglet Configuration */}
          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuration du projet</CardTitle>
                <CardDescription>
                  Configurez les paramètres spécifiques à votre projet {configurationComplete.nom}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {configurationComplete.variables.map(variable => (
                  <div key={variable.nom} className="space-y-2">
                    <Label htmlFor={variable.nom}>
                      {variable.label}
                      {variable.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    <Input
                      id={variable.nom}
                      type={variable.type}
                      placeholder={variable.placeholder}
                      value={configValues[variable.nom] || ''}
                      onChange={(e) => gererChangementConfig(variable.nom, e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">{variable.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Installation */}
          <TabsContent value="installation" className="space-y-6">
            {configurationComplete.etapes.map(etape => (
              <Card key={etape.numero}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {etape.numero}
                    </span>
                    {etape.titre}
                  </CardTitle>
                  <CardDescription>{etape.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {etape.commande && (
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>{etape.commande}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copierCode(etape.commande!, `commande-${etape.numero}`)}
                      >
                        {codesCopies[`commande-${etape.numero}`] ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  )}
                  {etape.code && (
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>{etape.code}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copierCode(etape.code!, `code-${etape.numero}`)}
                      >
                        {codesCopies[`code-${etape.numero}`] ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Onglet Exemples */}
          <TabsContent value="exemples" className="space-y-6">
            {configurationComplete.exemplesCode.map((exemple, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{exemple.titre}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code>{exemple.code}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() => copierCode(exemple.code, `exemple-${index}`)}
                    >
                      {codesCopies[`exemple-${index}`] ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Boutons d'action */}
        {(onRetour || onContinuer) && (
          <div className="flex justify-between mt-8">
            {onRetour && (
              <Button onClick={onRetour} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
            )}
            {onContinuer && (
              <Button onClick={gererContinuer} disabled={!peutContinuer} className={!onRetour ? "ml-auto" : ""}>
                Créer le projet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}