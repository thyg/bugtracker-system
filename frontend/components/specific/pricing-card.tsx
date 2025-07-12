"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  title: string
  price: string
  period?: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant?: "default" | "outline"
  popular?: boolean
  className?: string
  onSelect?: () => void
}

export function PricingCard({
  title,
  price,
  period = "/mois",
  description,
  features,
  buttonText,
  buttonVariant = "default",
  popular = false,
  className,
  onSelect,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "relative transition-all duration-200 hover:shadow-lg",
        popular && "border-purple-500 shadow-lg scale-105",
        className,
      )}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-purple-600 hover:bg-purple-700">Populaire</Badge>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          {period && <span className="text-muted-foreground">{period}</span>}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Button
          className={cn("w-full", popular && "bg-purple-600 hover:bg-purple-700")}
          variant={buttonVariant}
          onClick={onSelect}
        >
          {buttonText}
        </Button>

        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-5 h-5 bg-green-500/10 rounded-full flex items-center justify-center">
                <Check className="h-3 w-3 text-green-500" />
              </div>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
