"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Platform } from "@/lib/platforms-data"

interface PlatformCardProps {
  platform: Platform
  isSelected: boolean
  onSelect: (platformName: string) => void
}

export function PlatformCard({ platform, isSelected, onSelect }: PlatformCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(platform.name)}
      className={cn(
        "relative flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer transition-all duration-200",
        isSelected
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md"
          : "border-border hover:border-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-950/10",
      )}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
          <Check className="h-3 w-3 text-white" />
        </div>
      )}
      <div className="w-12 h-12 mb-3 flex items-center justify-center">
        <platform.icon className="h-8 w-8" />
      </div>
      <span className="text-sm font-medium text-center">{platform.name}</span>
      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {platform.categories.map((category) => (
          <span key={category} className="text-xs px-1.5 py-0.5 bg-muted rounded-full text-muted-foreground">
            {category}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
