"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface DocsSearchProps {
  value: string
  onChange: (value: string) => void
}

export function DocsSearch({ value, onChange }: DocsSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Rechercher dans la documentation..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  )
}
