"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, Edit, ExternalLink, Copy, Check } from "lucide-react"
import { useState } from "react"

interface DocsContentProps {
  articleId: string
}

const articlesContent: Record<string, any> = {
  "getting-started": {
    title: "Premiers pas avec BUG-TRACKER",
    description: "Apprenez à configurer BUG-TRACKER pour surveiller vos applications en quelques minutes.",
    readTime: "5 min",
    lastUpdated: "2024-01-15",
    content: `
# Premiers pas avec BUG-TRACKER

Bienvenue dans la documentation BUG-TRACKER ! Ce guide vous aidera à configurer rapidement la surveillance d'erreurs pour votre application.

## Qu'est-ce que BUG-TRACKER ?

BUG-TRACKER est une plateforme de surveillance d'applications qui vous aide à :
- **Détecter les erreurs** en temps réel
- **Diagnostiquer les problèmes** avec des stack traces détaillées
- **Surveiller les performances** de vos applications
- **Améliorer l'expérience utilisateur** en résolvant les bugs plus rapidement

## Installation rapide

### 1. Créer un compte

Commencez par créer un compte gratuit sur [BUG-TRACKER.io](https://BUG-TRACKER.io).

### 2. Créer un projet

Une fois connecté, créez votre premier projet en sélectionnant votre plateforme.

### 3. Installer le SDK

\`\`\`bash
# Pour JavaScript/Node.js
npm install @BUG-TRACKER/browser

# Pour React
npm install @BUG-TRACKER/react

# Pour Vue.js
npm install @BUG-TRACKER/vue
\`\`\`

### 4. Configuration de base

\`\`\`javascript
import * as BUG-TRACKER from "@BUG-TRACKER/browser";

BUG-TRACKER.init({
  dsn: "VOTRE_DSN_ICI",
  environment: "production",
});
\`\`\`

## Prochaines étapes

- [Configuration avancée](/docs/configuration)
- [Créer votre premier projet](/docs/first-project)
- [Intégrations disponibles](/docs/integrations)
    `,
  },
  installation: {
    title: "Installation",
    description: "Guide d'installation détaillé pour tous les environnements.",
    readTime: "10 min",
    lastUpdated: "2024-01-14",
    content: `
# Installation de BUG-TRACKER

Ce guide couvre l'installation de BUG-TRACKER pour différentes plateformes et environnements.

## Prérequis

- Node.js 14+ (pour les projets JavaScript)
- Un compte BUG-TRACKER actif
- Clé DSN de votre projet

## Installation par plateforme

### JavaScript/TypeScript

\`\`\`bash
npm install @BUG-TRACKER/browser
# ou
yarn add @BUG-TRACKER/browser
\`\`\`

### React

\`\`\`bash
npm install @BUG-TRACKER/react
\`\`\`

### Vue.js

\`\`\`bash
npm install @BUG-TRACKER/vue
\`\`\`

### Node.js

\`\`\`bash
npm install @BUG-TRACKER/node
\`\`\`

## Configuration initiale

Après l'installation, configurez BUG-TRACKER dans votre application :

\`\`\`javascript
import * as BUG-TRACKER from "@BUG-TRACKER/browser";

BUG-TRACKER.init({
  dsn: "https://votre-dsn@BUG-TRACKER.io/projet-id",
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
\`\`\`

## Vérification

Pour vérifier que l'installation fonctionne :

\`\`\`javascript
BUG-TRACKER.captureMessage("Test de BUG-TRACKER !");
\`\`\`
    `,
  },
  "quick-start": {
    title: "Démarrage rapide",
    description: "Configurez BUG-TRACKER en moins de 5 minutes.",
    readTime: "3 min",
    lastUpdated: "2024-01-15",
    content: `
# Démarrage rapide

Configurez BUG-TRACKER en moins de 5 minutes avec ce guide express.

## Étape 1 : Installation

\`\`\`bash
npm install @BUG-TRACKER/browser
\`\`\`

## Étape 2 : Configuration

\`\`\`javascript
import * as BUG-TRACKER from "@BUG-TRACKER/browser";

BUG-TRACKER.init({
  dsn: "VOTRE_DSN",
});
\`\`\`

## Étape 3 : Test

\`\`\`javascript
// Déclencher une erreur de test
throw new Error("Test BUG-TRACKER");
\`\`\`

## Étape 4 : Vérification

Vérifiez dans votre dashboard BUG-TRACKER que l'erreur a été capturée.

## Prochaines étapes

- [Configuration avancée](/docs/configuration)
- [Intégrations](/docs/integrations)
    `,
  },
}

export function DocsContent({ articleId }: DocsContentProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const article = articlesContent[articleId]

  if (!article) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
        <p className="text-muted-foreground">L'article demandé n'existe pas ou a été déplacé.</p>
      </div>
    )
  }

  const copyCode = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const renderContent = (content: string) => {
    const lines = content.trim().split("\n")
    const elements: JSX.Element[] = []
    let currentCodeBlock = ""
    let inCodeBlock = false
    let codeBlockId = 0

    lines.forEach((line, index) => {
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          // Fin du bloc de code
          const blockId = `code-${codeBlockId++}`
          elements.push(
            <Card key={`code-${index}`} className="my-4">
              <CardContent className="p-0">
                <div className="flex items-center justify-between bg-muted px-4 py-2 border-b">
                  <span className="text-sm font-mono text-muted-foreground">{line.replace("```", "") || "code"}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyCode(currentCodeBlock, blockId)}
                    className="h-8 w-8 p-0"
                  >
                    {copiedCode === blockId ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm">{currentCodeBlock}</code>
                </pre>
              </CardContent>
            </Card>,
          )
          currentCodeBlock = ""
          inCodeBlock = false
        } else {
          // Début du bloc de code
          inCodeBlock = true
        }
      } else if (inCodeBlock) {
        currentCodeBlock += line + "\n"
      } else if (line.startsWith("# ")) {
        elements.push(
          <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
            {line.replace("# ", "")}
          </h1>,
        )
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">
            {line.replace("## ", "")}
          </h2>,
        )
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={index} className="text-xl font-semibold mt-4 mb-2">
            {line.replace("### ", "")}
          </h3>,
        )
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={index} className="ml-4 mb-1">
            {line.replace("- ", "")}
          </li>,
        )
      } else if (line.trim() === "") {
        elements.push(<br key={index} />)
      } else {
        elements.push(
          <p key={index} className="mb-4 leading-relaxed">
            {line}
          </p>,
        )
      }
    })

    return elements
  }

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">Documentation</Badge>
          <Badge variant="outline" className="text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {article.readTime}
          </Badge>
        </div>
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-xl text-muted-foreground mb-6">{article.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Dernière mise à jour : {new Date(article.lastUpdated).toLocaleDateString("fr-FR")}</span>
          <Button variant="ghost" size="sm" className="h-auto p-0">
            <Edit className="w-4 h-4 mr-1" />
            Modifier cette page
          </Button>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Content */}
      <div className="space-y-4">{renderContent(article.content)}</div>

      {/* Footer */}
      <Separator className="my-8" />
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Cette page vous a-t-elle été utile ?
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm">
              👍 Oui
            </Button>
            <Button variant="outline" size="sm">
              👎 Non
            </Button>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <ExternalLink className="w-4 h-4 mr-2" />
          Voir sur GitHub
        </Button>
      </div>
    </article>
  )
}
