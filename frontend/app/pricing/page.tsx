"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PricingHero } from "@/components/pricing/pricing-hero"
import { PricingPlans } from "@/components/pricing/pricing-plans"
import { PricingComparison } from "@/components/pricing/pricing-comparison"
import { PayAsYouGo } from "@/components/pricing/pay-as-you-go"
import { PricingFAQ } from "@/components/pricing/pricing-faq"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <PricingHero billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
        <PricingPlans billingCycle={billingCycle} />
        <PricingComparison />
        <PayAsYouGo />
        <PricingFAQ />
      </main>

      <Footer />
    </div>
  )
}
