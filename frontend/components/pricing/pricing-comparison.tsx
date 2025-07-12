"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"

export function PricingComparison() {
  const comparisonData = [
    {
      category: "Monitoring & Troubleshooting",
      features: [
        {
          name: "Users",
          developer: "1 User",
          team: "Unlimited",
          business: "Unlimited",
          enterprise: "Unlimited",
        },
        {
          name: "Projects",
          developer: "Unlimited",
          team: "Unlimited",
          business: "Unlimited",
          enterprise: "Unlimited",
        },
        {
          name: "Error Monitoring",
          developer: "5k errors",
          team: "50k errors",
          business: "50k errors",
          enterprise: "Custom",
          tooltip: "Monthly error event quota",
        },
        {
          name: "Tracing",
          developer: "10M spans",
          team: "10M spans",
          business: "10M spans",
          enterprise: "Custom",
          tooltip: "Distributed tracing spans per month",
        },
        {
          name: "Session Replay",
          developer: "50 replays",
          team: "50 replays",
          business: "50 replays",
          enterprise: "Custom",
        },
        {
          name: "Uptime Monitoring",
          developer: "1 uptime monitor",
          team: "1 uptime monitor",
          business: "1 uptime monitor",
          enterprise: "Custom",
        },
        {
          name: "Cron Monitoring",
          developer: "1 cron monitor",
          team: "1 cron monitor",
          business: "1 cron monitor",
          enterprise: "Custom",
        },
        {
          name: "UI Profiling",
          developer: false,
          team: "Pay-as-you-go required",
          business: "Pay-as-you-go required",
          enterprise: "Custom",
        },
        {
          name: "Continuous Profiling",
          developer: false,
          team: "Pay-as-you-go required",
          business: "Pay-as-you-go required",
          enterprise: "Custom",
        },
        {
          name: "Attachments",
          developer: "1GB",
          team: "1GB",
          business: "1GB",
          enterprise: "Custom",
        },
      ],
    },
    {
      category: "Workflow & Alerts",
      features: [
        {
          name: "Ownership Rules",
          developer: true,
          team: true,
          business: true,
          enterprise: true,
        },
        {
          name: "Code Owners",
          developer: true,
          team: true,
          business: true,
          enterprise: true,
        },
        {
          name: "Suspect Commits",
          developer: true,
          team: true,
          business: true,
          enterprise: true,
        },
        {
          name: "Issue Alerts",
          developer: "Email",
          team: "Integrated tools",
          business: "Integrated tools",
          enterprise: "Integrated tools",
        },
        {
          name: "Metric Alerts",
          developer: false,
          team: true,
          business: true,
          enterprise: true,
        },
      ],
    },
    {
      category: "Reporting & Search",
      features: [
        {
          name: "Release Health",
          developer: true,
          team: true,
          business: true,
          enterprise: true,
        },
        {
          name: "Custom Tags",
          developer: true,
          team: true,
          business: true,
          enterprise: true,
        },
        {
          name: "Span Metrics",
          developer: true,
          team: true,
          business: true,
          enterprise: true,
        },
        {
          name: "Application Insights",
          developer: false,
          team: "7-day lookback",
          business: "90-day lookback",
          enterprise: "90-day lookback",
          tooltip: "Historical performance insights and trends",
        },
        {
          name: "LLM Monitoring (beta)",
          developer: true,
          team: true,
          business: true,
          enterprise: true,
        },
      ],
    },
    {
      category: "Integrations",
      features: [
        {
          name: "API",
          developer: true,
          team: true,
          business: true,
          enterprise: true,
        },
        {
          name: "Third-party integrations",
          developer: false,
          team: true,
          business: true,
          enterprise: true,
        },
        {
          name: "Data forwarding",
          developer: false,
          team: true,
          business: true,
          enterprise: true,
        },
      ],
    },
    {
      category: "Account & Data Management",
      features: [
        {
          name: "90-day data retention",
          developer: true,
          team: true,
          business: true,
          enterprise: true,
        },
        {
          name: "Filtering options",
          developer: true,
          team: true,
          business: true,
          enterprise: true,
        },
      ],
    },
    {
      category: "Admin & Compliance",
      features: [
        {
          name: "Authentication",
          developer: "Basic",
          team: "Enhanced",
          business: "Advanced",
          enterprise: "Enterprise SSO",
        },
        {
          name: "Certifications",
          developer: false,
          team: "BAA, HIPAA",
          business: "SOC2, ISO 27001",
          enterprise: "All certifications",
        },
        {
          name: "Data Residency",
          developer: false,
          team: false,
          business: true,
          enterprise: true,
        },
        {
          name: "Relay",
          developer: false,
          team: false,
          business: true,
          enterprise: true,
        },
      ],
    },
    {
      category: "Support",
      features: [
        {
          name: "Support Level",
          developer: "Community support",
          team: "Email support",
          business: "Email support",
          enterprise: "Technical Account Manager",
        },
      ],
    },
  ]

  const renderFeatureValue = (value: any) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-400 mx-auto" />
      )
    }
    return <span className="text-sm text-center block">{value}</span>
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Compare all features</h2>
          <p className="text-xl text-muted-foreground">Detailed breakdown of what's included in each plan</p>
        </motion.div>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-center">Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-medium min-w-[200px]">Features</th>
                    <th className="text-center p-4 font-medium min-w-[120px]">Developer</th>
                    <th className="text-center p-4 font-medium min-w-[120px]">
                      <div className="flex flex-col items-center">
                        Team
                        <Badge className="mt-1 bg-blue-600 text-xs">Popular</Badge>
                      </div>
                    </th>
                    <th className="text-center p-4 font-medium min-w-[120px]">Business</th>
                    <th className="text-center p-4 font-medium min-w-[120px]">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((category, categoryIndex) => (
                    <>
                      <tr key={category.category} className="bg-muted/30">
                        <td colSpan={5} className="p-4 font-semibold text-sm uppercase tracking-wide">
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <tr key={featureIndex} className="border-b hover:bg-muted/20">
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span>{feature.name}</span>
                              {feature.tooltip && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="w-4 h-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="max-w-xs">{feature.tooltip}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          </td>
                          <td className="p-4">{renderFeatureValue(feature.developer)}</td>
                          <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20">{renderFeatureValue(feature.team)}</td>
                          <td className="p-4">{renderFeatureValue(feature.business)}</td>
                          <td className="p-4">{renderFeatureValue(feature.enterprise)}</td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
