"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function VersionsPage() {
  const [project, setProject] = useState('Tous les projets');
  const [environment, setEnvironment] = useState('Tous les environnements');
  const [count, setCount] = useState(73);

  const handleCountClick = () => {
    alert(`Compteur: ${count}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
            Versions
            <span className="ml-2 text-gray-500" title="Informations sur les versions">?</span>
          </h1>
          <div className="flex space-x-4">
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="border bg-white rounded px-3 py-2 focus:outline-none"
            >
              <option value="Tous les projets">Tous les projets</option>
              <option value="react-native">react-native</option>
              <option value="web-app">web-app</option>
              <option value="api-backend">api-backend</option>
            </select>
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              className="border bg-white rounded px-3 py-2 focus:outline-none"
            >
              <option value="Tous les environnements">Tous les environnements</option>
              <option value="Production">Production</option>
              <option value="Staging">Staging</option>
              <option value="Development">Development</option>
            </select>
            <button
              className="border bg-white rounded px-3 py-2 hover:bg-gray-100"
              onClick={handleCountClick}
            >
              {count}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Configurer les versions</h2>
        <p className="text-gray-600 mb-6">
          Trouvez la version à l’origine d’un problème, appliquez des mappings de sources et soyez informé de vos déploiements.
        </p>
        <p className="text-gray-600 mb-8">
          Ajoutez les commandes suivantes à votre configuration CI lorsque vous déployez votre application.
        </p>

        <div className="bg-gray-900 text-gray-100 rounded-lg overflow-auto">
          <pre className="p-6 font-mono text-sm whitespace-pre-wrap">
            {`# Installer le CLI
curl -sL https://sentry.io/get-cli/ | bash

# Configurer les valeurs
SENTRY_AUTH_TOKEN=<cliquez-ici-pour-votre-token>
SENTRY_ORG=docteur-uc
SENTRY_PROJECT=react-native
VERSION=\`sentry-cli releases propose-version\`

# Workflow pour créer des versions
sentry-cli releases new "\$VERSION"
sentry-cli releases set-commits "\$VERSION" --auto
sentry-cli releases finalize "\$VERSION"`}
          </pre>
        </div>
      </main>

      {/* Section principale */}
      <main className="max-w-5xl mx-auto p-6 space-y-12">
        <section>
          <h1 className="text-3xl font-bold">Versions</h1>
          <p className="mt-2 text-gray-600">
            Avec les versions, vous pouvez associer une erreur à la version exacte du code et déterminer la stabilité de votre dernier déploiement.
          </p>
        </section>

        {/* Bannière premium */}
        <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2L2 8l8 10 8-10-8-6z"/>
            </svg>
            <div>
              <p className="font-semibold">Vous disposez d’une fonctionnalité premium inutilisée !</p>
              <p className="text-sm text-gray-700">
                Pour en savoir plus sur les versions, <a href="#" className="underline">cliquez ici</a>.
              </p>
            </div>
          </div>
          <button className="mt-4 md:mt-0 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
            Installez-vous dès maintenant
          </button>
        </section>

        {/* Section alertes */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold">Alertes de messagerie en temps réel sur les dernières alertes Versions déployées</h2>
            <p className="mt-2 text-gray-600">
              Vous pouvez envoyer des notifications concernant une nouvelle version de code aux alertes existantes (intégrations telles que Slack, e‑mail, etc.).
            </p>
            <button className="mt-4 inline-block border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
              Mettez-vous en place dès aujourd’hui
            </button>
          </div>

          {/* Carte Slack */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <img src="/rollbar-logo.png" alt="Rollbar" className="w-8 h-8 mr-2"/>
              <span className="text-gray-500 text-sm uppercase font-medium">Rollbar</span>
              <span className="ml-auto text-gray-400 text-xs">2:28 PM</span>
            </div>
            <p className="text-gray-800 mb-2">
              Nouvelle version <span className="font-mono bg-gray-100 px-1 rounded">9595c0</span> détectée en production
            </p>
            <div className="flex space-x-4 text-sm text-gray-600">
              <div>
                <span className="block font-medium">version</span>
                <span className="block h-1 bg-blue-400 rounded mt-1"></span>
              </div>
              <div>
                <span className="block font-medium">déployé par</span>
                <span className="block h-1 bg-blue-400 rounded mt-1"></span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}