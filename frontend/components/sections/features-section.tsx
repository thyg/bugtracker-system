"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Monitor, Zap, Video, BarChart3, Shield, Users } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Monitor,
      title: t("features.error.title"),
      description: t("features.error.desc"),
    },
    {
      icon: BarChart3,
      title: t("features.performance.title"),
      description: t("features.performance.desc"),
    },
    {
      icon: Video,
      title: t("features.replay.title"),
      description: t("features.replay.desc"),
    },
    {
      icon: Zap,
      title: t("features.alerts.title"),
      description: t("features.alerts.desc"),
    },
    {
      icon: Shield,
      title: t("features.security.title"),
      description: t("features.security.desc"),
    },
    {
      icon: Users,
      title: t("features.collaboration.title"),
      description: t("features.collaboration.desc"),
    },
  ]

  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t("features.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("features.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-purple-500/50 transition-colors duration-300"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
