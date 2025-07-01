"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    company: "Airbnb",
    logo: "/placeholder.svg?height=40&width=120",
    quote: "testimonials.airbnb",
    author: "Sarah Chen",
    role: "Engineering Manager",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    company: "Spotify",
    logo: "/placeholder.svg?height=40&width=120",
    quote: "testimonials.spotify",
    author: "Marcus Johnson",
    role: "Senior Developer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    company: "Microsoft",
    logo: "/placeholder.svg?height=40&width=120",
    quote: "testimonials.microsoft",
    author: "Elena Rodriguez",
    role: "Product Manager",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    company: "Dropbox",
    logo: "/placeholder.svg?height=40&width=120",
    quote: "testimonials.dropbox",
    author: "David Kim",
    role: "Tech Lead",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function TestimonialsSection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t("testimonials.title")}</h2>
          <p className="text-xl text-muted-foreground">{t("testimonials.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card border-border hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Image
                      src={testimonial.logo || "/placeholder.svg"}
                      alt={testimonial.company}
                      width={120}
                      height={40}
                      className="h-8 w-auto opacity-70"
                    />
                  </div>
                  <blockquote className="text-lg text-foreground mb-6 italic">"{t(testimonial.quote)}"</blockquote>
                  <div className="flex items-center">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Company logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-8">
            Utilisé par plus de 100 000 développeurs dans le monde entier
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["Netflix", "Uber", "Discord", "Shopify", "Atlassian", "GitHub", "Slack", "Zoom"].map((company) => (
              <div key={company} className="text-lg font-semibold text-muted-foreground">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
