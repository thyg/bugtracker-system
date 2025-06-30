"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-purple-900/20 to-background py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Announcement Banner */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-purple-200">
            <span>{t("hero.announcement")}</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </div>

        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            {t("hero.title.part1")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {t("hero.title.part2")}
            </span>
            {t("hero.title.part3")}
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">{t("hero.subtitle")}</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/register">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-4">
                {t("hero.cta.try")}
              </Button>
            </Link>
          </div>

          {/* Hero Image/Dashboard Mockup */}
          <div className="relative max-w-6xl mx-auto">
            <div className="relative bg-card rounded-lg border border-border shadow-2xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=600&width=1200"
                  alt="Tableau de bord BUG-TRACKER"
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-500 rounded-lg transform rotate-12 flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="absolute top-1/2 -left-8 w-12 h-12 bg-red-500 rounded-lg transform -rotate-12 flex items-center justify-center">
              <span className="text-xl">🚨</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
