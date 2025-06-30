"use client"

import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"

interface PricingHeroProps {
  billingCycle: "monthly" | "annual"
  setBillingCycle: (cycle: "monthly" | "annual") => void
}

export function PricingHero({ billingCycle, setBillingCycle }: PricingHeroProps) {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-blue-50/30 to-background dark:via-blue-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Badge className="mb-4 bg-blue-600/20 text-blue-700 dark:text-blue-300 border-blue-500/30">
            Simple & Transparent Pricing
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6">
            Pricing plans for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              dev teams
            </span>{" "}
            of all sizes
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Start free and scale with your team. All plans include our core monitoring features.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <span
              className={`text-sm font-medium ${billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"}`}
            >
              Monthly
            </span>
            <Switch
              checked={billingCycle === "annual"}
              onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
              className="data-[state=checked]:bg-blue-600"
            />
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-medium ${billingCycle === "annual" ? "text-foreground" : "text-muted-foreground"}`}
              >
                Annual
              </span>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
              >
                Save with annual
              </Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
