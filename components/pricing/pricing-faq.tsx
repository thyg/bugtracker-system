"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

export function PricingFAQ() {
  const faqItems = [
    {
      question: "What happens if I exceed my plan limits?",
      answer:
        "If you exceed your plan's included quota, you'll be charged for additional usage at our pay-as-you-go rates. You can set up alerts to notify you when you're approaching your limits, and you can always upgrade your plan or purchase additional quota in advance at a discount.",
    },
    {
      question: "Can I change plans at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing accordingly. If you downgrade, any unused quota from your previous plan will be credited to your account.",
    },
    {
      question: "Do you offer discounts for nonprofits or educational institutions?",
      answer:
        "Yes, we offer special pricing for qualified nonprofits, educational institutions, and open source projects. Contact our sales team to learn more about our discount programs and eligibility requirements.",
    },
    {
      question: "What's included in the free Developer plan?",
      answer:
        "The Developer plan includes error monitoring and tracing for up to 5,000 errors per month, email alerts, and access to our core features. It's perfect for individual developers and small projects getting started with application monitoring.",
    },
    {
      question: "How does annual billing work?",
      answer:
        "With annual billing, you pay for 12 months upfront and receive a 20% discount on both your base plan and any additional quota you purchase. You can switch to annual billing at any time, and we'll credit any unused portion of your monthly plan.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "Support varies by plan: Developer plan includes community support, Team and Business plans include email support with response times within 24 hours, and Enterprise plans include a dedicated Technical Account Manager with priority support.",
    },
    {
      question: "Can I try features from higher plans?",
      answer:
        "Yes! All plans come with a 14-day free trial that includes access to features from higher tiers. This lets you evaluate our full platform before committing to a specific plan.",
    },
    {
      question: "How do you handle data retention?",
      answer:
        "All plans include 90 days of data retention for errors, traces, and other monitoring data. Enterprise customers can request custom retention periods. We also provide data export options if you need to archive data for longer periods.",
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">Everything you need to know about our pricing and plans</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border rounded-lg px-6 hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">Our team is here to help you find the right plan for your needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Contact Sales
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Schedule Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
