import { Copy, Check, ArrowLeft, ArrowRight, Globe, Server, Smartphone, Laptop, Zap, FileCode, Code, Layout } from "lucide-react"

// Types
interface ConfigurationPlateforme {
    nom: string
    description: string
    icone: any
    categories: string[]
    etapes: EtapeConfiguration[]
    variables: VariableConfiguration[]
    exemplesCode: ExempleCode[]
  }
  
  interface EtapeConfiguration {
    numero: number
    titre: string
    description: string
    commande?: string
    code?: string
  }
  
  interface VariableConfiguration {
    nom: string
    label: string
    description: string
    placeholder: string
    required: boolean
    type: 'text' | 'url' | 'number'
  }
  
  interface ExempleCode {
    langage: string
    titre: string
    code: string
  }
  
// Données de configuration pour chaque plateforme
export const configurationsPlateformes: Record<string, ConfigurationPlateforme> = {
"Next.js": {
    nom: "Next.js",
    description: "Framework React full-stack avec rendu côté serveur",
    icone: Globe,
    categories: ["Navigateur", "Serveur", "Sans serveur"],
    etapes: [
    {
        numero: 1,
        titre: "Installation du SDK",
        description: "Installez le SDK de monitoring dans votre projet Next.js",
        commande: "npm install @monitorify/nextjs"
    },
    {
        numero: 2,
        titre: "Configuration",
        description: "Configurez le SDK dans votre fichier next.config.js",
        code: `// next.config.js
const { withMonitorify } = require('@monitorify/nextjs');

module.exports = withMonitorify({
// Votre configuration Next.js existante
}, {
dsn: 'VOTRE_DSN_ICI',
environment: process.env.NODE_ENV,
});`
    },
    {
        numero: 3,
        titre: "Initialisation",
        description: "Initialisez le monitoring dans votre _app.tsx",
        code: `// pages/_app.tsx ou app/layout.tsx
import { MonitorifyProvider } from '@monitorify/nextjs';

export default function App({ Component, pageProps }) {
return (
    <MonitorifyProvider>
    <Component {...pageProps} />
    </MonitorifyProvider>
);
}`
    }
    ],
    variables: [
    { nom: "projectName", label: "Nom du projet", description: "Nom de votre projet Next.js", placeholder: "mon-app-nextjs", required: true, type: "text" },
    { nom: "environment", label: "Environnement", description: "Environnement de déploiement", placeholder: "production", required: true, type: "text" },
    { nom: "apiUrl", label: "URL de l'API", description: "URL de votre API backend", placeholder: "https://api.monapp.com", required: false, type: "url" }
    ],
    exemplesCode: [
    {
        langage: "javascript",
        titre: "Capture d'erreur personnalisée",
        code: `import { captureException } from '@monitorify/nextjs';

try {
// Votre code ici
} catch (error) {
captureException(error);
}`
    }
    ]
},
"React": {
    nom: "React",
    description: "Bibliothèque JavaScript pour construire des interfaces utilisateur",
    icone: Layout,
    categories: ["Navigateur"],
    etapes: [
    {
        numero: 1,
        titre: "Installation",
        description: "Installez le SDK React dans votre projet",
        commande: "npm install @monitorify/react"
    },
    {
        numero: 2,
        titre: "Configuration",
        description: "Configurez le SDK dans votre fichier principal",
        code: `// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { MonitorifyProvider } from '@monitorify/react';
import App from './App';

ReactDOM.render(
<MonitorifyProvider dsn="VOTRE_DSN_ICI">
    <App />
</MonitorifyProvider>,
document.getElementById('root')
);`
    }
    ],
    variables: [
    { nom: "projectName", label: "Nom du projet", description: "Nom de votre application React", placeholder: "mon-app-react", required: true, type: "text" },
    { nom: "version", label: "Version", description: "Version de votre application", placeholder: "1.0.0", required: false, type: "text" }
    ],
    exemplesCode: [
    {
        langage: "javascript",
        titre: "Error Boundary",
        code: `import { ErrorBoundary } from '@monitorify/react';

function App() {
return (
    <ErrorBoundary fallback={<div>Erreur détectée</div>}>
    <MonComposant />
    </ErrorBoundary>
);
}`
    }
    ]
},
"Laravel": {
    nom: "Laravel",
    description: "Framework PHP élégant pour le développement web",
    icone: Server,
    categories: ["Serveur"],
    etapes: [
    {
        numero: 1,
        titre: "Installation via Composer",
        description: "Installez le package Laravel dans votre projet",
        commande: "composer require monitorify/laravel"
    },
    {
        numero: 2,
        titre: "Configuration",
        description: "Publiez et configurez le fichier de configuration",
        commande: "php artisan vendor:publish --provider=\"Monitorify\\Laravel\\MonitorifyServiceProvider\""
    },
    {
        numero: 3,
        titre: "Variables d'environnement",
        description: "Ajoutez vos clés dans le fichier .env",
        code: `# .env
MONITORIFY_DSN=VOTRE_DSN_ICI
MONITORIFY_ENVIRONMENT=production
MONITORIFY_TRACES_SAMPLE_RATE=0.1`
    }
    ],
    variables: [
    { nom: "projectName", label: "Nom du projet", description: "Nom de votre application Laravel", placeholder: "mon-api-laravel", required: true, type: "text" },
    { nom: "environment", label: "Environnement", description: "Environnement de déploiement", placeholder: "production", required: true, type: "text" },
    { nom: "dbHost", label: "Hôte de base de données", description: "Hôte de votre base de données", placeholder: "localhost", required: false, type: "text" }
    ],
    exemplesCode: [
    {
        langage: "php",
        titre: "Capture d'exception",
        code: `<?php
use Monitorify\\Laravel\\Facades\\Monitorify;

try {
    // Votre code ici
} catch (Exception $e) {
    Monitorify::captureException($e);
}`
    }
    ]
},
"Django": {
    nom: "Django",
    description: "Framework web Python de haut niveau",
    icone: Server,
    categories: ["Serveur"],
    etapes: [
    {
        numero: 1,
        titre: "Installation",
        description: "Installez le SDK Django via pip",
        commande: "pip install monitorify-django"
    },
    {
        numero: 2,
        titre: "Configuration",
        description: "Ajoutez la configuration dans settings.py",
        code: `# settings.py
import monitorify_django

monitorify_django.init(
    dsn="VOTRE_DSN_ICI",
    environment="production",
    traces_sample_rate=0.1,
)

INSTALLED_APPS = [
    # ...
    'monitorify_django',
]`
    }
    ],
    variables: [
    { nom: "projectName", label: "Nom du projet", description: "Nom de votre projet Django", placeholder: "mon-api-django", required: true, type: "text" },
    { nom: "environment", label: "Environnement", description: "Environnement de déploiement", placeholder: "production", required: true, type: "text" },
    { nom: "debugMode", label: "Mode debug", description: "Mode debug activé", placeholder: "False", required: false, type: "text" }
    ],
    exemplesCode: [
    {
        langage: "python",
        titre: "Capture d'erreur",
        code: `import monitorify_django

try:
    # Votre code ici
    pass
except Exception as e:
    monitorify_django.capture_exception(e)`
    }
    ]
}
}
