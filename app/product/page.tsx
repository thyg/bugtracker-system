"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Monitor, Zap, Video, Puzzle, CheckCircle, ArrowRight, Play } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import Image from "next/image"

const productFeatures = {
  monitoring: {
    title: "Surveillance des erreurs",
    description: "Détectez, triez et résolvez les erreurs en temps réel",
    features: [
      "Suivi des erreurs en temps réel",
      "Stack traces détaillées",
      "Groupement intelligent des erreurs",
      "Alertes personnalisables",
      "Intégration avec votre workflow",
    ],
    benefits: [
      "Réduction de 90% du temps de résolution",
      "Amélioration de la satisfaction utilisateur",
      "Prévention des pannes critiques",
    ],
  },
  performance: {
    title: "Surveillance des performances",
    description: "Optimisez les performances de vos applications",
    features: [
      "Métriques de performance en temps réel",
      "Analyse des goulots d'étranglement",
      "Surveillance des transactions",
      "Alertes de performance",
      "Rapports détaillés",
    ],
    benefits: [
      "Amélioration de 40% des temps de réponse",
      "Réduction des coûts d'infrastructure",
      "Meilleure expérience utilisateur",
    ],
  },
  replay: {
    title: "Replay de session",
    description: "Voyez exactement ce que vos utilisateurs ont vécu",
    features: [
      "Enregistrement automatique des sessions",
      "Reproduction fidèle des interactions",
      "Synchronisation avec les erreurs",
      "Filtrage avancé",
      "Protection de la vie privée",
    ],
    benefits: ["Résolution 3x plus rapide des bugs", "Compréhension approfondie des problèmes", "Amélioration de l'UX"],
  },
  integrations: {
    title: "Intégrations",
    description: "Connectez BUG-TRACKER à votre stack technologique",
    features: [
      "Plus de 100 intégrations",
      "SDKs pour tous les langages",
      "Webhooks personnalisés",
      "API REST complète",
      "Plugins pour IDEs",
    ],
    benefits: ["Intégration en moins de 5 minutes", "Workflow unifié", "Automatisation complète"],
  },
}

const integrationLogos = [
  { name: "React", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Vue.js", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Angular", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Node.js", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Python", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Java", logo: "/placeholder.svg?height=40&width=40" },
  { name: "PHP", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Ruby", logo: "/placeholder.svg?height=40&width=40" },
]

export default function ProductPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("monitoring")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-background via-purple-900/10 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Badge className="mb-4 bg-purple-600/20 text-purple-300 border-purple-500/30">Plateforme complète</Badge>
              <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6">
                Surveillez, déboguez et{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  optimisez
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Une plateforme unifiée pour surveiller les performances, traquer les erreurs et améliorer l'expérience
                utilisateur de vos applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Commencer gratuitement
                </Button>
                <Button size="lg" variant="outline">
                  <Play className="mr-2 w-5 h-5" />
                  Voir la démo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Product Navigation */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12">
                <TabsTrigger value="monitoring" className="flex items-center space-x-2">
                  <Monitor className="w-4 h-4" />
                  <span>Monitoring</span>
                </TabsTrigger>
                <TabsTrigger value="performance" className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Performance</span>
                </TabsTrigger>
                <TabsTrigger value="replay" className="flex items-center space-x-2">
                  <Video className="w-4 h-4" />
                  <span>Replay</span>
                </TabsTrigger>
                <TabsTrigger value="integrations" className="flex items-center space-x-2">
                  <Puzzle className="w-4 h-4" />
                  <span>Intégrations</span>
                </TabsTrigger>
              </TabsList>

              {Object.entries(productFeatures).map(([key, feature]) => (
                <TabsContent key={key} value={key}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                  >
                    {/* Content */}
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-3xl font-bold text-foreground mb-4">{feature.title}</h2>
                        <p className="text-xl text-muted-foreground mb-6">{feature.description}</p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Fonctionnalités clés</h3>
                          <ul className="space-y-3">
                            {feature.features.map((item, index) => (
                              <li key={index} className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Bénéfices</h3>
                          <div className="space-y-2">
                            {feature.benefits.map((benefit, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <ArrowRight className="w-4 h-4 text-purple-500" />
                                <span className="text-sm font-medium">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button className="bg-purple-600 hover:bg-purple-700">Essayer {feature.title}</Button>
                    </div>

                    {/* Screenshot/Demo */}
                    <div className="relative">
                      <Card className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                            <Image
                              src="/placeholder.svg?height=400&width=600"
                              alt={`Interface ${feature.title}`}
                              width={600}
                              height={400}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Floating elements for visual interest */}
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="absolute -top-4 -right-4 w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center"
                      >
                        <CheckCircle className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Integrations Showcase */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Intégrez-vous en quelques minutes</h2>
              <p className="text-xl text-muted-foreground">Compatible avec tous vos outils et frameworks préférés</p>
            </motion.div>

            <div className="grid grid-cols-4 md:grid-cols-8 gap-8 items-center justify-items-center">
              {integrationLogos.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <Image
                    src={integration.logo || "/placeholder.svg"}
                    alt={integration.name}
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Prêt à améliorer vos applications ?</h2>
              <p className="text-xl text-purple-100 mb-8">
                Rejoignez des milliers d'équipes qui utilisent BUG-TRACKER pour créer de meilleures expériences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Commencer gratuitement
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contacter les ventes
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
