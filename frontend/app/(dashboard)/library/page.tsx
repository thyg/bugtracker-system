"use client";

import React, { useState } from 'react';
import { 
  Package, 
  Download, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Code, 
  ExternalLink, 
  Search, 
  RefreshCw,
  Bug,
  Star,
  Activity
} from 'lucide-react';

export default function LibrariesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const [sortBy, setSortBy] = useState('name');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newLibrary, setNewLibrary] = useState({
    name: '',
    category: 'Frontend',
    version: '',
    status: 'Active',
    description: '',
    documentation: '',
    maintainers: '',
    size: '',
    dependencies: 0
  });

  const categories = ['Toutes', 'Frontend', 'Backend', 'Mobile', 'DevTools', 'Testing'];
  const statuses = ['Tous', 'Active', 'Deprecated', 'Beta', 'Maintenance'];

  const initialLibraries = [
    {
      id: 1,
      name: '@sentry/react',
      category: 'Frontend',
      version: '7.84.0',
      status: 'Active',
      description: 'SDK React officiel pour le monitoring d\'erreurs',
      downloads: '2.5M',
      errors: 0,
      lastUpdate: '2 jours',
      severity: 'low',
      dependencies: 12,
      size: '45KB',
      rating: 4.8,
      maintainers: ['Sentry Team'],
      documentation: 'https://docs.sentry.io/platforms/javascript/guides/react/',
      issues: 3
    },
    {
      id: 2,
      name: '@sentry/node',
      category: 'Backend',
      version: '7.84.0',
      status: 'Active',
      description: 'SDK Node.js pour le suivi des erreurs côté serveur',
      downloads: '1.8M',
      errors: 2,
      lastUpdate: '1 semaine',
      severity: 'medium',
      dependencies: 8,
      size: '120KB',
      rating: 4.9,
      maintainers: ['Sentry Team'],
      documentation: 'https://docs.sentry.io/platforms/node/',
      issues: 1
    },
    {
      id: 3,
      name: 'react-error-boundary',
      category: 'Frontend',
      version: '4.0.11',
      status: 'Active',
      description: 'Composant React pour gérer les erreurs de manière élégante',
      downloads: '890K',
      errors: 1,
      lastUpdate: '3 semaines',
      severity: 'low',
      dependencies: 2,
      size: '12KB',
      rating: 4.6,
      maintainers: ['Brian Vaughn'],
      documentation: 'https://github.com/bvaughn/react-error-boundary',
      issues: 0
    },
    {
      id: 4,
      name: 'winston',
      category: 'Backend',
      version: '3.11.0',
      status: 'Active',
      description: 'Logger asynchrone simple et universel pour Node.js',
      downloads: '15M',
      errors: 5,
      lastUpdate: '1 mois',
      severity: 'high',
      dependencies: 15,
      size: '85KB',
      rating: 4.7,
      maintainers: ['Winston Team'],
      documentation: 'https://github.com/winstonjs/winston',
      issues: 8
    },
    {
      id: 5,
      name: '@rollbar/react',
      category: 'Frontend',
      version: '0.11.0',
      status: 'Beta',
      description: 'SDK React pour Rollbar error tracking',
      downloads: '45K',
      errors: 3,
      lastUpdate: '2 mois',
      severity: 'medium',
      dependencies: 6,
      size: '38KB',
      rating: 4.2,
      maintainers: ['Rollbar Team'],
      documentation: 'https://docs.rollbar.com/docs/react',
      issues: 2
    },
    {
      id: 6,
      name: 'expo-error-recovery',
      category: 'Mobile',
      version: '4.0.1',
      status: 'Maintenance',
      description: 'Récupération d\'erreurs pour applications Expo/React Native',
      downloads: '125K',
      errors: 0,
      lastUpdate: '6 mois',
      severity: 'low',
      dependencies: 4,
      size: '22KB',
      rating: 4.4,
      maintainers: ['Expo Team'],
      documentation: 'https://docs.expo.dev/versions/latest/sdk/error-recovery/',
      issues: 1
    }
  ];

  const [librariesList, setLibrariesList] = useState(initialLibraries);

  const stats = [
    { label: 'Librairies Totales', value: '24', icon: Package, color: 'blue' },
    { label: 'Erreurs Actives', value: '11', icon: Bug, color: 'red' },
    { label: 'Mises à Jour', value: '6', icon: RefreshCw, color: 'green' },
    { label: 'Téléchargements', value: '20.4M', icon: Download, color: 'purple' },
  ];

  const filteredLibraries = librariesList.filter(lib => {
    const matchesSearch = lib.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lib.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Toutes' || lib.category === selectedCategory;
    const matchesStatus = selectedStatus === 'Tous' || lib.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedLibraries = [...filteredLibraries].sort((a, b) => {
    switch (sortBy) {
      case 'errors':
        return b.errors - a.errors;
      case 'downloads':
        return parseFloat(b.downloads) - parseFloat(a.downloads);
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleAddLibrary = () => {
    if (!newLibrary.name || !newLibrary.version || !newLibrary.description) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const library = {
      id: Date.now(),
      name: newLibrary.name,
      category: newLibrary.category,
      version: newLibrary.version,
      status: newLibrary.status,
      description: newLibrary.description,
      downloads: '0',
      errors: 0,
      lastUpdate: 'Aujourd\'hui',
      severity: 'low',
      dependencies: parseInt(newLibrary.dependencies) || 0,
      size: newLibrary.size || 'N/A',
      rating: 0,
      maintainers: [newLibrary.maintainers || 'Équipe interne'],
      documentation: newLibrary.documentation || '#',
      issues: 0
    };

    setLibrariesList([...librariesList, library]);
    setShowAddModal(false);
    setNewLibrary({
      name: '',
      category: 'Frontend',
      version: '',
      status: 'Active',
      description: '',
      documentation: '',
      maintainers: '',
      size: '',
      dependencies: 0
    });
    
    // Animation de succès
    setTimeout(() => {
      alert(`Librairie "${library.name}" ajoutée avec succès !`);
    }, 100);
  };

  const handleInputChange = (field, value) => {
    setNewLibrary(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Beta': return 'text-blue-600 bg-blue-100';
      case 'Deprecated': return 'text-red-600 bg-red-100';
      case 'Maintenance': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Librairies</h1>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Surveillance active</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Package className="w-4 h-4" />
                <span>Ajouter Librairie</span>
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

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une librairie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 bg-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 bg-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 bg-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Nom</option>
                <option value="errors">Erreurs</option>
                <option value="downloads">Téléchargements</option>
                <option value="rating">Note</option>
              </select>
            </div>
          </div>
        </div>

        {/* Libraries Grid */}
        <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-6">
          {sortedLibraries.map((library) => (
            <div key={library.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{library.name}</h3>
                      <span className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                        v{library.version}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(library.status)}`}>
                        {library.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{library.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>{library.downloads}/mois</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Package className="w-3 h-3" />
                        <span>{library.size}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>{library.rating}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(library.severity)}`}>
                      Risque {library.severity === 'low' ? 'Faible' : library.severity === 'medium' ? 'Moyen' : 'Élevé'}
                    </span>
                    {library.errors > 0 && (
                      <span className="flex items-center space-x-1 text-red-600 text-xs">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{library.errors} erreur{library.errors > 1 ? 's' : ''}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Dépendances</p>
                    <p className="text-sm font-semibold text-gray-900">{library.dependencies}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Issues</p>
                    <p className="text-sm font-semibold text-gray-900">{library.issues}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Dernière MAJ</p>
                    <p className="text-sm font-semibold text-gray-900">{library.lastUpdate}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Par {library.maintainers[0]}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Code className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <Activity className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedLibraries.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune librairie trouvée</h3>
            <p className="text-gray-500">Essayez de modifier vos filtres de recherche</p>
          </div>
        )}
      </div>

      {/* Modal Ajouter Librairie */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Ajouter une Nouvelle Librairie</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-600 mt-2">Remplissez les informations de la librairie à ajouter</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Nom et Version */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de la librairie *
                  </label>
                  <input
                    type="text"
                    value={newLibrary.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="ex: @sentry/react"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Version *
                  </label>
                  <input
                    type="text"
                    value={newLibrary.version}
                    onChange={(e) => handleInputChange('version', e.target.value)}
                    placeholder="ex: 7.84.0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Catégorie et Statut */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie
                  </label>
                  <select
                    value={newLibrary.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.filter(cat => cat !== 'Toutes').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    value={newLibrary.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statuses.filter(status => status !== 'Tous').map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={newLibrary.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Décrivez brièvement la fonction de cette librairie..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Informations supplémentaires */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mainteneur(s)
                  </label>
                  <input
                    type="text"
                    value={newLibrary.maintainers}
                    onChange={(e) => handleInputChange('maintainers', e.target.value)}
                    placeholder="ex: Équipe Sentry"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taille
                  </label>
                  <input
                    type="text"
                    value={newLibrary.size}
                    onChange={(e) => handleInputChange('size', e.target.value)}
                    placeholder="ex: 45KB"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Documentation (URL)
                  </label>
                  <input
                    type="url"
                    value={newLibrary.documentation}
                    onChange={(e) => handleInputChange('documentation', e.target.value)}
                    placeholder="https://docs.example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de dépendances
                  </label>
                  <input
                    type="number"
                    value={newLibrary.dependencies}
                    onChange={(e) => handleInputChange('dependencies', e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Note d'information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Information</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Les champs marqués d'un astérisque (*) sont obligatoires. 
                      Les autres métriques (téléchargements, note, erreurs) seront initialisées automatiquement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAddLibrary}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Package className="w-4 h-4" />
                <span>Ajouter la Librairie</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}