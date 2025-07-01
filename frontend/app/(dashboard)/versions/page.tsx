"use client";

import React, { useState } from 'react';
import { ChevronDown, AlertCircle, Bell, Copy, Check, ExternalLink, Settings, Activity, GitBranch, Clock, Users } from 'lucide-react';

export default function VersionsPage() {
  const [project, setProject] = useState('Tous les projets');
  const [environment, setEnvironment] = useState('Tous les environnements');
  const [count, setCount] = useState(73);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleCountClick = () => {
    alert(`Compteur: ${count}`);
  };

  const handleCopyCode = () => {
    const code = `# Installer le CLI
curl -sL https://sentry.io/get-cli/ | bash

# Configurer les valeurs
SENTRY_AUTH_TOKEN=<cliquez-ici-pour-votre-token>
SENTRY_ORG=docteur-uc
SENTRY_PROJECT=react-native
VERSION=\`sentry-cli releases propose-version\`

# Workflow pour créer des versions
sentry-cli releases new "\$VERSION"
sentry-cli releases set-commits "\$VERSION" --auto
sentry-cli releases finalize "\$VERSION"`;
    
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const versions = [
    { id: '9595c0', date: '2 heures', env: 'Production', status: 'stable', errors: 0 },
    { id: 'a7b3d1', date: '1 jour', env: 'Staging', status: 'testing', errors: 2 },
    { id: 'f2e8c9', date: '3 jours', env: 'Development', status: 'active', errors: 12 },
  ];

  const stats = [
    { label: 'Versions Actives', value: '12', icon: GitBranch, color: 'blue' },
    { label: 'Déploiements Récents', value: '5', icon: Activity, color: 'green' },
    { label: 'Erreurs Totales', value: '14', icon: AlertCircle, color: 'red' },
    { label: 'Temps Moyen', value: '2.3s', icon: Clock, color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Versions</h1>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Système opérationnel</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="border border-gray-300 bg-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Tous les projets">Tous les projets</option>
                <option value="react-native">react-native</option>
                <option value="web-app">web-app</option>
                <option value="api-backend">api-backend</option>
              </select>
              
              <select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                className="border border-gray-300 bg-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Tous les environnements">Tous les environnements</option>
                <option value="Production">Production</option>
                <option value="Staging">Staging</option>
                <option value="Development">Development</option>
              </select>
              
              <button
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={handleCountClick}
              >
                <Bell className="w-4 h-4" />
                <span>{count}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Banner */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Fonctionnalité Premium Disponible</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Débloquez des analyses avancées et des notifications en temps réel
                </p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg">
              Mettre à niveau
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Configuration des Versions</h2>
                <p className="text-gray-600 mt-2">
                  Configurez votre CI/CD pour un tracking automatique des versions
                </p>
              </div>
              
              <div className="p-6">
                <div className="relative">
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-800">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-400 text-sm ml-4">Configuration CLI</span>
                      </div>
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center space-x-2 px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span className="text-sm">{copied ? 'Copié' : 'Copier'}</span>
                      </button>
                    </div>
                    <pre className="p-6 text-gray-100 text-sm overflow-x-auto">
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
                </div>
              </div>
            </div>

            {/* Versions List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Versions Récentes</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {versions.map((version) => (
                  <div key={version.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="font-mono text-sm bg-gray-100 px-3 py-1 rounded">
                          {version.id}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{version.env}</p>
                          <p className="text-sm text-gray-500">Déployé il y a {version.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          version.status === 'stable' ? 'bg-green-100 text-green-800' :
                          version.status === 'testing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {version.status}
                        </span>
                        <span className={`text-sm font-medium ${
                          version.errors === 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {version.errors} erreurs
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">S</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Slack</p>
                    <p className="text-xs text-gray-600">Nouvelle version 9595c0 détectée</p>
                    <p className="text-xs text-gray-500 mt-1">Il y a 2h</p>
                  </div>
                </div>
                
                <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
                  <Settings className="w-5 h-5 mx-auto mb-2" />
                  <span className="text-sm">Configurer les alertes</span>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <GitBranch className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">Créer une version</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Activity className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">Voir les métriques</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <ExternalLink className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">Documentation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}