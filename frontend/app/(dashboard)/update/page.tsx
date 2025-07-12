"use client";

import { useState } from "react";
import { ChevronDown, Download, ExternalLink, AlertCircle, CheckCircle, Clock, Code, Package, Star, GitBranch, Calendar, ArrowUp, Zap, Shield, Wrench, RefreshCw, Filter, Search } from "lucide-react";

export default function SDKUpdatesPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("Tous");
  const [updateType, setUpdateType] = useState("Toutes");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const sdkUpdates = [
    {
      id: "java-sdk-4.2.1",
      language: "Java",
      version: "4.2.1",
      currentVersion: "4.1.8",
      releaseDate: "2024-12-28",
      type: "minor",
      size: "2.3 MB",
      compatibility: "Java 8+",
      status: "stable",
      downloads: "1.2M",
      description: "Amélioration des performances et corrections de bugs critiques",
      changelog: [
        "Optimisation des requêtes HTTP (+30% performance)",
        "Correction du memory leak dans le module de cache",
        "Nouveau support pour OpenTelemetry",
        "API améliorée pour la gestion des erreurs"
      ],
      breaking: false,
      security: true
    },
    {
      id: "python-sdk-3.8.0",
      language: "Python",
      version: "3.8.0",
      currentVersion: "3.7.2",
      releaseDate: "2024-12-26",
      type: "major",
      size: "4.1 MB",
      compatibility: "Python 3.8+",
      status: "beta",
      downloads: "890K",
      description: "Nouvelle architecture async/await et support Python 3.12",
      changelog: [
        "Refactorisation complète en async/await",
        "Support natif de Python 3.12",
        "Nouvelle API de streaming en temps réel",
        "Breaking: Suppression des méthodes dépréciées"
      ],
      breaking: true,
      security: false
    },
    {
      id: "nextjs-sdk-2.5.3",
      language: "Next.js",
      version: "2.5.3",
      currentVersion: "2.5.0",
      releaseDate: "2024-12-25",
      type: "patch",
      size: "1.8 MB",
      compatibility: "Next.js 13+",
      status: "stable",
      downloads: "650K",
      description: "Corrections de bugs et amélioration de la compatibilité",
      changelog: [
        "Fix: Problème de hydratation SSR",
        "Amélioration du tree-shaking",
        "Support amélioré pour App Router",
        "Corrections de types TypeScript"
      ],
      breaking: false,
      security: false
    },
    {
      id: "react-native-sdk-1.9.2",
      language: "React Native",
      version: "1.9.2",
      currentVersion: "1.8.7",
      releaseDate: "2024-12-24",
      type: "minor",
      size: "3.2 MB",
      compatibility: "RN 0.68+",
      status: "stable",
      downloads: "420K",
      description: "Support des nouvelles architectures et améliorations iOS",
      changelog: [
        "Support de la nouvelle architecture React Native",
        "Amélioration des performances sur iOS",
        "Nouveau module de crash reporting",
        "Fix: Problèmes de compatibilité Android 14"
      ],
      breaking: false,
      security: true
    },
    {
      id: "nodejs-sdk-5.1.0",
      language: "Node.js",
      version: "5.1.0",
      currentVersion: "5.0.4",
      releaseDate: "2024-12-23",
      type: "minor",
      size: "2.7 MB",
      compatibility: "Node.js 16+",
      status: "stable",
      downloads: "2.1M",
      description: "Nouvelles fonctionnalités de monitoring et ESM support",
      changelog: [
        "Support complet des modules ES (ESM)",
        "Nouveau système de métriques",
        "Amélioration du profiling CPU",
        "Support Node.js 21"
      ],
      breaking: false,
      security: false
    },
    {
      id: "swift-sdk-3.4.1",
      language: "Swift",
      version: "3.4.1",
      currentVersion: "3.3.8",
      releaseDate: "2024-12-22",
      type: "patch",
      size: "1.5 MB",
      compatibility: "iOS 12+",
      status: "stable",
      downloads: "280K",
      description: "Corrections de bugs et amélioration de la stabilité",
      changelog: [
        "Fix: Crash lors de l'initialisation",
        "Amélioration de la gestion mémoire",
        "Support des nouvelles API iOS 17",
        "Corrections de warnings Xcode 15"
      ],
      breaking: false,
      security: true
    }
  ];

  const languages = ["Tous", "Java", "Python", "Next.js", "React Native", "Node.js", "Swift"];
  const updateTypes = ["Toutes", "major", "minor", "patch"];

  const getLanguageIcon = (language) => {
    const icons = {
      "Java": "☕",
      "Python": "🐍", 
      "Next.js": "⚡",
      "React Native": "📱",
      "Node.js": "🟢",
      "Swift": "🍎"
    };
    return icons[language] || "📦";
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "major": return "bg-red-100 text-red-800";
      case "minor": return "bg-blue-100 text-blue-800";
      case "patch": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "stable": return "bg-green-100 text-green-800";
      case "beta": return "bg-yellow-100 text-yellow-800";
      case "alpha": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredUpdates = sdkUpdates.filter(update => {
    const matchesLanguage = selectedLanguage === "Tous" || update.language === selectedLanguage;
    const matchesType = updateType === "Toutes" || update.type === updateType;
    const matchesSearch = update.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLanguage && matchesType && matchesSearch;
  });

  const stats = [
    { label: "Mises à Jour Disponibles", value: filteredUpdates.length.toString(), icon: Package, color: "blue" },
    { label: "Mises à Jour Critiques", value: filteredUpdates.filter(u => u.security).length.toString(), icon: Shield, color: "red" },
    { label: "Langages Supportés", value: "6", icon: Code, color: "green" },
    { label: "Téléchargements Total", value: "5.4M", icon: Download, color: "purple" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Mises à Jour SDK</h1>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isRefreshing ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                <span className="text-sm text-gray-600">
                  {isRefreshing ? 'Vérification...' : 'À jour'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Vérifier</span>
              </button>
              
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Tout Télécharger</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
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

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un SDK..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="border border-gray-300 bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            
            <select
              value={updateType}
              onChange={(e) => setUpdateType(e.target.value)}
              className="border border-gray-300 bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Toutes">Tous Types</option>
              <option value="major">Majeure</option>
              <option value="minor">Mineure</option>
              <option value="patch">Correctif</option>
            </select>
          </div>
        </div>

        {/* SDK Updates Grid */}
        <div className="grid gap-6">
          {filteredUpdates.map((update) => (
            <div key={update.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{getLanguageIcon(update.language)}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{update.language} SDK</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">
                          {update.currentVersion} → {update.version}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(update.type)}`}>
                          {update.type}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(update.status)}`}>
                          {update.status}
                        </span>
                        {update.breaking && (
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                            Breaking
                          </span>
                        )}
                        {update.security && (
                          <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full flex items-center space-x-1">
                            <Shield className="w-3 h-3" />
                            <span>Sécurité</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      <span>Changelog</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Télécharger</span>
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{update.description}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Informations</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taille:</span>
                        <span className="font-medium">{update.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Compatibilité:</span>
                        <span className="font-medium">{update.compatibility}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Téléchargements:</span>
                        <span className="font-medium">{update.downloads}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date de sortie:</span>
                        <span className="font-medium">
                          {new Date(update.releaseDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Nouveautés</h4>
                    <ul className="space-y-1 text-sm">
                      {update.changelog.slice(0, 3).map((change, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{change}</span>
                        </li>
                      ))}
                      {update.changelog.length > 3 && (
                        <li className="text-blue-600 text-sm cursor-pointer hover:underline">
                          +{update.changelog.length - 3} autres changements...
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {update.breaking && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-red-800">Attention - Changements incompatibles</span>
                    </div>
                    <p className="text-red-700 text-sm mt-1">
                      Cette mise à jour contient des changements qui peuvent casser votre code existant. 
                      Veuillez consulter le guide de migration avant la mise à jour.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredUpdates.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune mise à jour trouvée</h3>
            <p className="text-gray-600">Essayez de modifier vos filtres ou votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
}