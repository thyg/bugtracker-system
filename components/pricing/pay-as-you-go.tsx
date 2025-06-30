"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, TrendingDown } from "lucide-react"
import { motion } from "framer-motion"

export function PayAsYouGo() {
  const [selectedPlan, setSelectedPlan] = useState("team")
  const [isAnnual, setIsAnnual] = useState(false)
  const [monthlyErrors, setMonthlyErrors] = useState([100])
  const [monthlySpans, setMonthlySpans] = useState([50])
  const [monthlyReplays, setMonthlyReplays] = useState([10])
  const [monthlyAttachments, setMonthlyAttachments] = useState([5])

  const basePrices = {
    team: { monthly: 26, annual: 21 },
    business: { monthly: 80, annual: 64 },
  }

  const additionalCosts = {
    errors: 0.0002, // per error
    spans: 0.000001, // per span
    replays: 0.02, // per replay
    attachments: 0.1, // per GB
  }

  const calculateTotal = () => {
    const basePrice = basePrices[selectedPlan as keyof typeof basePrices][isAnnual ? "annual" : "monthly"]

    const errorCost = monthlyErrors[0] * 1000 * additionalCosts.errors
    const spanCost = monthlySpans[0] * 1000000 * additionalCosts.spans
    const replayCost = monthlyReplays[0] * 1000 * additionalCosts.replays
    const attachmentCost = monthlyAttachments[0] * additionalCosts.attachments

    const additionalTotal = errorCost + spanCost + replayCost + attachmentCost
    const discount = isAnnual ? 0.8 : 1 // 20% discount for annual

    return {
      base: basePrice,
      additional: additionalTotal * discount,
      total: basePrice + additionalTotal * discount,
      savings: isAnnual ? additionalTotal * 0.2 : 0,
    }
  }

  const costs = calculateTotal()

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingDown className="w-6 h-6 text-green-500" />
            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
              Pay ahead, save money
            </Badge>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">Reserve events and save 20%</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pre-purchase additional quota at a discount. Perfect for teams with predictable usage patterns.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Cost Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Plan Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Plan</label>
                  <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="team">Team Plan</SelectItem>
                      <SelectItem value="business">Business Plan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Billing Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Annual Billing</span>
                  <div className="flex items-center gap-2">
                    <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
                    {isAnnual && (
                      <Badge variant="secondary" className="text-xs">
                        20% off
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Usage Sliders */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Monthly Errors (thousands)</label>
                      <span className="text-sm text-muted-foreground">{monthlyErrors[0]}k</span>
                    </div>
                    <Slider
                      value={monthlyErrors}
                      onValueChange={setMonthlyErrors}
                      max={1000}
                      min={50}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Monthly Spans (millions)</label>
                      <span className="text-sm text-muted-foreground">{monthlySpans[0]}M</span>
                    </div>
                    <Slider
                      value={monthlySpans}
                      onValueChange={setMonthlySpans}
                      max={500}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Monthly Replays (thousands)</label>
                      <span className="text-sm text-muted-foreground">{monthlyReplays[0]}k</span>
                    </div>
                    <Slider
                      value={monthlyReplays}
                      onValueChange={setMonthlyReplays}
                      max={100}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Monthly Attachments (GB)</label>
                      <span className="text-sm text-muted-foreground">{monthlyAttachments[0]}GB</span>
                    </div>
                    <Slider
                      value={monthlyAttachments}
                      onValueChange={setMonthlyAttachments}
                      max={100}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cost Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Base {selectedPlan} plan</span>
                    <span className="font-medium">${costs.base.toFixed(2)}/mo</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Additional usage</span>
                    <span className="font-medium">${costs.additional.toFixed(2)}/mo</span>
                  </div>

                  {isAnnual && costs.savings > 0 && (
                    <div className="flex justify-between items-center text-green-600">
                      <span className="text-sm">Annual savings</span>
                      <span className="font-medium">-${costs.savings.toFixed(2)}/mo</span>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">${costs.total.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">per {isAnnual ? "month" : "month"}</div>
                      </div>
                    </div>
                  </div>

                  {isAnnual && (
                    <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                      <div className="text-sm text-green-700 dark:text-green-300">
                        💰 You save ${(costs.savings * 12).toFixed(2)} per year with annual billing!
                      </div>
                    </div>
                  )}
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Get Started with {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  * Prices shown include the 20% discount for reserved quota
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
