"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

interface PricingPlansProps {
  billingCycle: "monthly" | "annual"
}

export function PricingPlans({ billingCycle }: PricingPlansProps) {
  const plans = [
    {
      name: "Developer",
      price: { monthly: 0, annual: 0 },
      description: "For solo devs working on small projects",
      features: ["One user", "Error Monitoring and Tracing", "Alerts and notifications via email"],
      cta: "Start trial",
      popular: false,
      variant: "outline" as const,
    },
    {
      name: "Team",
      price: { monthly: 26, annual: 21 },
      description: "For growing teams that collaborate",
      features: [
        "Developer features +",
        "Unlimited users",
        "Third-party integrations",
        "Metric alerts",
        "Insights (7 day lookback)",
        "Additional events (See pricing)",
      ],
      cta: "Start trial",
      popular: true,
      variant: "default" as const,
    },
    {
      name: "Business",
      price: { monthly: 80, annual: 64 },
      description: "For multiple teams that operate at scale",
      features: [
        "Team features +",
        "Insights (90 day lookback)",
        "Custom dashboards",
        "Advanced quota management",
        "Additional events (See pricing)",
      ],
      cta: "Start trial",
      popular: false,
      variant: "outline" as const,
    },
    {
      name: "Enterprise",
      price: { monthly: "Custom", annual: "Custom" },
      description: "For organizations with advanced needs",
      features: ["Business features +", "Technical Account Manager", "Dedicated customer support"],
      cta: "Contact sales",
      popular: false,
      variant: "outline" as const,
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}

              <Card
                className={`h-full transition-all duration-300 hover:shadow-lg ${
                  plan.popular ? "border-blue-500 shadow-lg scale-105" : "hover:border-blue-300"
                }`}
              >
                <CardHeader className="text-center pb-4">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center">
                      {typeof plan.price[billingCycle] === "number" ? (
                        <>
                          <span className="text-4xl font-bold">${plan.price[billingCycle]}</span>
                          <span className="text-muted-foreground ml-1">
                            /{billingCycle === "monthly" ? "mo" : "yr"}
                          </span>
                        </>
                      ) : (
                        <span className="text-4xl font-bold">{plan.price[billingCycle]}</span>
                      )}
                    </div>
                    {billingCycle === "annual" && typeof plan.price.monthly === "number" && plan.price.monthly > 0 && (
                      <div className="text-sm text-muted-foreground mt-1">
                        ${Math.round(plan.price.annual * 12)} billed annually
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Button
                    className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    variant={plan.variant}
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
