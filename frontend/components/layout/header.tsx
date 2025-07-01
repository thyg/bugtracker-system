"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageSelector } from "@/components/ui/language-selector"
import { Menu, X, ChevronDown } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  const navigation = [
    { name: t("nav.product"), href: "/product", hasDropdown: true },
    { name: t("nav.pricing"), href: "/pricing" },
    { name: t("nav.docs"), href: "/docs" },
    { name: t("nav.sandbox"), href: "/sandbox" },
  ]

  return (
    <header className="relative bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BT</span>
              </div>
              <span className="text-foreground font-bold text-xl">BUG-TRACKER</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center space-x-1"
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
              </div>
            ))}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSelector />
            <Link href="/login">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                {t("nav.signin")}
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline">{t("nav.getdemo")}</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-purple-600 hover:bg-purple-700">{t("nav.getstarted")}</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSelector />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border z-50">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Link href="/login" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  {t("nav.signin")}
                </Button>
              </Link>
              <Link href="/demo" className="block">
                <Button variant="outline" className="w-full">
                  {t("nav.getdemo")}
                </Button>
              </Link>
              <Link href="/register" className="block">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">{t("nav.getstarted")}</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
