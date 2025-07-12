"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import Link from "next/link"

export function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />

      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t("cta.title")}</h2>
          <p className="text-xl text-purple-100 mb-8">{t("cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4">
                {t("cta.trial")}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-10 left-10 w-16 h-16 bg-white/20 rounded-lg"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-10 right-10 w-12 h-12 bg-white/20 rounded-full"
      />
    </section>
  )
}
