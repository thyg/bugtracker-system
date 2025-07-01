"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "fr" | "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  fr: {
    // Navigation
    "nav.product": "Produit",
    "nav.pricing": "Tarifs",
    "nav.docs": "Documentation",
    "nav.blog": "Blog",
    "nav.sandbox": "Bac à sable",
    "nav.signin": "Connexion",
    "nav.getdemo": "Demander une démo",
    "nav.getstarted": "Commencer",

    // Hero Section
    "hero.announcement":
      "Vous voulez vous connecter avec les gens qui construisent BUG-TRACKER ? Rejoignez-nous sur Discord.",
    "hero.title.part1": "Le code",
    "hero.title.part2": "plante",
    "hero.title.part3": ", corrigez-le plus vite",
    "hero.subtitle":
      'Logiciel de surveillance d\'applications considéré comme "pas mal" par 4 millions de développeurs.',
    "hero.cta.try": "Essayer BUG-TRACKER gratuitement",
  

    // Features
    "features.title": "Tout ce dont vous avez besoin pour surveiller vos applications",
    "features.subtitle":
      "Du suivi des erreurs à la surveillance des performances, BUG-TRACKER fournit tous les outils nécessaires pour créer de meilleurs logiciels.",
    "features.error.title": "Surveillance des erreurs",
    "features.error.desc":
      "Obtenez un suivi des erreurs en temps réel et des traces de pile détaillées pour corriger les problèmes avant qu'ils n'impactent les utilisateurs.",
    "features.performance.title": "Surveillance des performances",
    "features.performance.desc":
      "Surveillez les performances des applications avec des métriques détaillées et identifiez instantanément les goulots d'étranglement.",
    "features.replay.title": "Replay de session",
    "features.replay.desc":
      "Regardez les sessions utilisateur pour comprendre exactement ce qui s'est passé quand des erreurs se sont produites.",
    "features.alerts.title": "Alertes en temps réel",
    "features.alerts.desc":
      "Soyez notifié immédiatement lorsque des problèmes surviennent avec des règles d'alerte personnalisables.",
    "features.security.title": "Surveillance de sécurité",
    "features.security.desc":
      "Suivez les problèmes de sécurité et les vulnérabilités dans toute votre pile d'applications.",
    "features.collaboration.title": "Collaboration d'équipe",
    "features.collaboration.desc":
      "Collaborez avec votre équipe pour résoudre les problèmes plus rapidement avec des outils de workflow intégrés.",

    // Testimonials
    "testimonials.title": "Approuvé par des millions de développeurs",
    "testimonials.subtitle": "Rejoignez les entreprises qui comptent sur BUG-TRACKER pour créer de meilleurs logiciels",
    "testimonials.airbnb": "BUG-TRACKER nous aide à détecter les erreurs avant nos utilisateurs.",
    "testimonials.spotify": "Essentiel pour maintenir la qualité de nos applications.",
    "testimonials.microsoft": "Des insights incroyables sur les performances de nos applications.",
    "testimonials.dropbox": "Suivi d'erreurs et surveillance révolutionnaires.",

    // CTA Section
    "cta.title": "Prêt à corriger les problèmes plus rapidement ?",
    "cta.subtitle":
      "Rejoignez des millions de développeurs qui font confiance à BUG-TRACKER pour surveiller leurs applications.",
    "cta.trial": "Commencer l'essai gratuit",
  

    // Footer
    "footer.description":
      "Logiciel de surveillance d'applications qui aide les développeurs à corriger les problèmes plus rapidement.",
    "footer.product": "Produit",
    "footer.developers": "Développeurs",
    "footer.company": "Entreprise",
    "footer.support": "Support",
    "footer.copyright": "© 2024 BUG-TRACKER. Tous droits réservés.",
    "footer.privacy": "Politique de confidentialité",
    "footer.terms": "Conditions d'utilisation",

    // Theme and Language
    "theme.toggle": "Basculer le thème",
    "language.select": "Choisir la langue",
  },
  en: {
    // Navigation
    "nav.product": "Product",
    "nav.pricing": "Pricing",
    "nav.docs": "Docs",
    "nav.blog": "Blog",
    "nav.sandbox": "Sandbox",
    "nav.signin": "Sign In",
    "nav.getdemo": "Get a Demo",
    "nav.getstarted": "Get Started",

    // Hero Section
    "hero.announcement": "Want to connect with the folks building BUG-TRACKER? Join us on Discord.",
    "hero.title.part1": "Code",
    "hero.title.part2": "breaks",
    "hero.title.part3": ", fix it faster",
    "hero.subtitle": 'Application monitoring software considered "not bad" by 4 million developers.',
    "hero.cta.try": "Try BUG-TRACKER for Free",
    

    // Features
    "features.title": "Everything you need to monitor your applications",
    "features.subtitle":
      "From error tracking to performance monitoring, BUG-TRACKER provides all the tools you need to build better software.",
    "features.error.title": "Error Monitoring",
    "features.error.desc":
      "Get real-time error tracking and detailed stack traces to fix issues before they impact users.",
    "features.performance.title": "Performance Monitoring",
    "features.performance.desc":
      "Monitor application performance with detailed metrics and identify bottlenecks instantly.",
    "features.replay.title": "Session Replay",
    "features.replay.desc": "Watch user sessions to understand exactly what happened when errors occurred.",
    "features.alerts.title": "Real-time Alerts",
    "features.alerts.desc": "Get notified immediately when issues arise with customizable alert rules.",
    "features.security.title": "Security Monitoring",
    "features.security.desc": "Track security issues and vulnerabilities across your entire application stack.",
    "features.collaboration.title": "Team Collaboration",
    "features.collaboration.desc": "Collaborate with your team to resolve issues faster with built-in workflow tools.",

    // Testimonials
    "testimonials.title": "Trusted by millions of developers",
    "testimonials.subtitle": "Join the companies that rely on BUG-TRACKER to build better software",
    "testimonials.airbnb": "BUG-TRACKER helps us catch errors before our users do.",
    "testimonials.spotify": "Essential for maintaining our application quality.",
    "testimonials.microsoft": "Incredible insights into our application performance.",
    "testimonials.dropbox": "Game-changing error tracking and monitoring.",

    // CTA Section
    "cta.title": "Ready to fix issues faster?",
    "cta.subtitle": "Join millions of developers who trust BUG-TRACKER to monitor their applications.",
    "cta.trial": "Start Free Trial",
  

    // Footer
    "footer.description": "Application monitoring software that helps developers fix issues faster.",
    "footer.product": "Product",
    "footer.developers": "Developers",
    "footer.company": "Company",
    "footer.support": "Support",
    "footer.copyright": "© 2024 BUG-TRACKER. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",

    // Theme and Language
    "theme.toggle": "Toggle theme",
    "language.select": "Select language",
  },
  es: {
    // Navigation
    "nav.product": "Producto",
    "nav.pricing": "Precios",
    "nav.docs": "Documentación",
    "nav.blog": "Blog",
    "nav.sandbox": "Sandbox",
    "nav.signin": "Iniciar sesión",
    "nav.getdemo": "Solicitar demo",
    "nav.getstarted": "Comenzar",

    // Hero Section
    "hero.announcement": "¿Quieres conectar con la gente que construye BUG-TRACKER? Únete a nosotros en Discord.",
    "hero.title.part1": "El código",
    "hero.title.part2": "falla",
    "hero.title.part3": ", arréglalo más rápido",
    "hero.subtitle": 'Software de monitoreo de aplicaciones considerado "no malo" por 4 millones de desarrolladores.',
    "hero.cta.try": "Probar BUG-TRACKER gratis",

    // Features
    "features.title": "Todo lo que necesitas para monitorear tus aplicaciones",
    "features.subtitle":
      "Desde seguimiento de errores hasta monitoreo de rendimiento, BUG-TRACKER proporciona todas las herramientas que necesitas para crear mejor software.",
    "features.error.title": "Monitoreo de errores",
    "features.error.desc":
      "Obtén seguimiento de errores en tiempo real y trazas de pila detalladas para corregir problemas antes de que impacten a los usuarios.",
    "features.performance.title": "Monitoreo de rendimiento",
    "features.performance.desc":
      "Monitorea el rendimiento de la aplicación con métricas detalladas e identifica cuellos de botella al instante.",
    "features.replay.title": "Reproducción de sesión",
    "features.replay.desc":
      "Observa las sesiones de usuario para entender exactamente qué pasó cuando ocurrieron errores.",
    "features.alerts.title": "Alertas en tiempo real",
    "features.alerts.desc":
      "Recibe notificaciones inmediatamente cuando surjan problemas con reglas de alerta personalizables.",
    "features.security.title": "Monitoreo de seguridad",
    "features.security.desc": "Rastrea problemas de seguridad y vulnerabilidades en toda tu pila de aplicaciones.",
    "features.collaboration.title": "Colaboración en equipo",
    "features.collaboration.desc":
      "Colabora con tu equipo para resolver problemas más rápido con herramientas de flujo de trabajo integradas.",

    // Testimonials
    "testimonials.title": "Confiado por millones de desarrolladores",
    "testimonials.subtitle": "Únete a las empresas que confían en BUG-TRACKER para crear mejor software",
    "testimonials.airbnb": "BUG-TRACKER nos ayuda a detectar errores antes que nuestros usuarios.",
    "testimonials.spotify": "Esencial para mantener la calidad de nuestras aplicaciones.",
    "testimonials.microsoft": "Insights increíbles sobre el rendimiento de nuestras aplicaciones.",
    "testimonials.dropbox": "Seguimiento de errores y monitoreo revolucionario.",

    // CTA Section
    "cta.title": "¿Listo para arreglar problemas más rápido?",
    "cta.subtitle": "Únete a millones de desarrolladores que confían en BUG-TRACKER para monitorear sus aplicaciones.",
    "cta.trial": "Comenzar prueba gratuita",
  

    // Footer
    "footer.description":
      "Software de monitoreo de aplicaciones que ayuda a los desarrolladores a arreglar problemas más rápido.",
    "footer.product": "Producto",
    "footer.developers": "Desarrolladores",
    "footer.company": "Empresa",
    "footer.support": "Soporte",
    "footer.copyright": "© 2024 BUG-TRACKER. Todos los derechos reservados.",
    "footer.privacy": "Política de privacidad",
    "footer.terms": "Términos de servicio",

    // Theme and Language
    "theme.toggle": "Cambiar tema",
    "language.select": "Seleccionar idioma",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[Language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
