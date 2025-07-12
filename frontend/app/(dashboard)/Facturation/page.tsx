"use client"

import { useState } from "react"
import { CreditCard, Download, Eye, Calendar, AlertCircle, CheckCircle, Clock, Users, Zap, Crown, Star, ArrowUpCircle, FileText, Receipt, Building, Mail, Phone, MapPin, Edit, Trash2, Plus, X } from "lucide-react"

interface Plan {
  id: string
  name: string
  price: number
  interval: 'monthly' | 'yearly'
  features: string[]
  popular?: boolean
  current?: boolean
}

interface Invoice {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  description: string
  downloadUrl?: string
}

interface PaymentMethod {
  id: string
  type: 'card' | 'paypal' | 'bank_transfer'
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  email?: string
  bankName?: string
  isDefault: boolean
}

interface BillingAddress {
  company?: string
  name: string
  email: string
  phone?: string
  address: string
  city: string
  postalCode: string
  country: string
  vatNumber?: string
}

const mockPlans: Plan[] = [
  {
    id: 'free',
    name: 'Gratuit',
    price: 0,
    interval: 'monthly',
    features: [
      '5 projets maximum',
      '1 Go de stockage',
      'Support communautaire',
      'Fonctionnalités de base'
    ],
    current: true
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    interval: 'monthly',
    features: [
      'Projets illimités',
      '100 Go de stockage',
      'Support prioritaire',
      'Intégrations avancées',
      'Analytics détaillés',
      'API complète'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    interval: 'monthly',
    features: [
      'Tout du plan Pro',
      'Stockage illimité',
      'Support dédié 24/7',
      'SSO et sécurité avancée',
      'Gestion d\'équipe',
      'SLA garanti',
      'Déploiement on-premise'
    ]
  }
]

const mockInvoices: Invoice[] = [
  {
    id: 'inv_001',
    date: '2023-04-01',
    amount: 29.00,
    status: 'paid',
    description: 'Abonnement Pro - Avril 2023',
    downloadUrl: '#'
  },
  {
    id: 'inv_002',
    date: '2023-03-01',
    amount: 29.00,
    status: 'paid',
    description: 'Abonnement Pro - Mars 2023',
    downloadUrl: '#'
  },
  {
    id: 'inv_003',
    date: '2023-02-01',
    amount: 29.00,
    status: 'failed',
    description: 'Abonnement Pro - Février 2023'
  }
]

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true
  },
  {
    id: '2',
    type: 'paypal',
    email: 'user@example.com',
    isDefault: false
  }
]

export default function SettingsBilling() {
  const [selectedPlan, setSelectedPlan] = useState<string>('free')
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly')
  const [invoices] = useState<Invoice[]>(mockInvoices)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods)
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false)
  const [showBillingAddressModal, setShowBillingAddressModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    name: 'Benoît Mbarga',
    email: 'benoit.mbarga@example.cm',
    phone: '+237 6 78 90 12 34',
    address: 'Rue du Marché Central',
    city: 'Yaoundé',
    postalCode: '237',
    country: 'Cameroun',
    company: 'Entreprise Camerounaise S.A.',
    vatNumber: 'CM123456789' // Numéro fictif adapté au format local
  })
  

  const toast = (options: {title: string, description: string}) => {
    alert(`${options.title}: ${options.description}`)
  }

  const handlePlanChange = async (planId: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSelectedPlan(planId)
      const plan = mockPlans.find(p => p.id === planId)
      toast({
        title: "Plan mis à jour",
        description: `Vous êtes maintenant abonné au plan ${plan?.name}`,
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du changement de plan",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePaymentMethod = (methodId: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== methodId))
    toast({
      title: "Méthode supprimée",
      description: "La méthode de paiement a été supprimée",
    })
  }

  const handleSetDefaultPaymentMethod = (methodId: string) => {
    setPaymentMethods(prev =>
      prev.map(method => ({
        ...method,
        isDefault: method.id === methodId
      }))
    )
    toast({
      title: "Méthode par défaut",
      description: "La méthode de paiement par défaut a été mise à jour",
    })
  }

  const getStatusIcon = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return 'Payée'
      case 'pending':
        return 'En attente'
      case 'failed':
        return 'Échouée'
      default:
        return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF'
    }).format(price)
  }

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="w-4 h-4" />
      case 'paypal':
        return <div className="w-4 h-4 bg-blue-500 rounded text-white text-xs flex items-center justify-center">P</div>
      case 'bank_transfer':
        return <Building className="w-4 h-4" />
      default:
        return <CreditCard className="w-4 h-4" />
    }
  }

  // Ajout d'un état pour la nouvelle méthode de paiement
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
    name: '',
    isDefault: false
  })

  // Gestionnaire de changement pour l'adresse de facturation
  const handleBillingAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({ ...prev, [name]: value }));
  }

  // Gestionnaire de soumission pour l'adresse de facturation
  const handleBillingAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBillingAddressModal(false);
    toast({
      title: "Adresse mise à jour",
      description: "Votre adresse de facturation a été sauvegardée",
    });
  }

  // Gestionnaire pour les changements de méthode de paiement
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewPaymentMethod(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  // Gestionnaire d'ajout de nouvelle méthode de paiement
  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simplifiée
    if (!newPaymentMethod.cardNumber || !newPaymentMethod.name) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
      });
      return;
    }

    // Création de la nouvelle méthode
    const newMethod: PaymentMethod = {
      id: `pm_${Date.now()}`,
      type: 'card',
      last4: newPaymentMethod.cardNumber.slice(-4),
      brand: 'Visa', // Simplifié
      expiryMonth: parseInt(newPaymentMethod.expiryMonth),
      expiryYear: parseInt(newPaymentMethod.expiryYear),
      isDefault: newPaymentMethod.isDefault
    };

    setPaymentMethods(prev => [
      ...prev,
      newMethod
    ]);

    setShowAddPaymentModal(false);
    setNewPaymentMethod({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvc: '',
      name: '',
      isDefault: false
    });

    toast({
      title: "Méthode ajoutée",
      description: "Votre nouvelle méthode de paiement a été enregistrée",
    });
  }


  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900">Facturation</h1>
        <p className="text-gray-600 mt-2">Gérez votre abonnement, vos méthodes de paiement et votre historique de facturation</p>
      </div>

      {/* Current Plan Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Plan Actuel</h2>
            </div>
            <p className="text-gray-600 mt-1">Plan Gratuit - Jusqu'à 5 projets</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">0 FCFA</div>
            <div className="text-sm text-gray-500">par mois</div>
          </div>
        </div>
        <div className="mt-4">
          <button 
            onClick={() => handlePlanChange('pro')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <ArrowUpCircle className="w-4 h-4" />
            Mettre à niveau
          </button>
        </div>
      </div>

      {/* Billing Interval Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setBillingInterval('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingInterval === 'monthly' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setBillingInterval('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingInterval === 'yearly' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Annuel
            <span className="ml-1 text-xs bg-green-100 text-green-800 px-1 rounded">-20%</span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {mockPlans.map((plan) => (
          <div key={plan.id} className={`relative rounded-lg border p-6 ${
            plan.popular ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200'
          } ${plan.current ? 'bg-blue-50' : 'bg-white'}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Populaire
                </span>
              </div>
            )}
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(billingInterval === 'yearly' ? plan.price * 12 * 0.8 : plan.price)}
                </span>
                <span className="text-gray-600">/{billingInterval === 'yearly' ? 'an' : 'mois'}</span>
              </div>
            </div>
            
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6">
              {plan.current ? (
                <button className="w-full bg-gray-100 text-gray-600 py-2 px-4 rounded-lg cursor-not-allowed">
                  Plan actuel
                </button>
              ) : (
                <button
                  onClick={() => handlePlanChange(plan.id)}
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Changement...' : 'Choisir ce plan'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Méthodes de paiement</h2>
          <button 
            onClick={() => setShowAddPaymentModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </button>
        </div>
        
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                {getPaymentMethodIcon(method.type)}
                <div>
                  {method.type === 'card' && (
                    <div>
                      <div className="font-medium">
                        {method.brand} ****{method.last4}
                      </div>
                      <div className="text-sm text-gray-500">
                        Expire {method.expiryMonth}/{method.expiryYear}
                      </div>
                    </div>
                  )}
                  {method.type === 'paypal' && (
                    <div>
                      <div className="font-medium">PayPal</div>
                      <div className="text-sm text-gray-500">{method.email}</div>
                    </div>
                  )}
                  {method.isDefault && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full mt-1 inline-block">
                      Par défaut
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefaultPaymentMethod(method.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Définir par défaut
                  </button>
                )}
                <button
                  onClick={() => handleDeletePaymentMethod(method.id)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing Address */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Adresse de facturation</h2>
          <button 
            onClick={() => setShowBillingAddressModal(true)}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <Edit className="w-4 h-4" />
            Modifier
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {billingAddress.company && (
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-400" />
                <span>{billingAddress.company}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span>{billingAddress.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>{billingAddress.email}</span>
            </div>
            {billingAddress.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{billingAddress.phone}</span>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <div>{billingAddress.address}</div>
                <div>{billingAddress.postalCode} {billingAddress.city}</div>
                <div>{billingAddress.country}</div>
              </div>
            </div>
            {billingAddress.vatNumber && (
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span>TVA: {billingAddress.vatNumber}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Historique des factures</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Description</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Montant</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Statut</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b">
                  <td className="py-4 text-sm text-gray-900">
                    {formatDate(invoice.date)}
                  </td>
                  <td className="py-4 text-sm text-gray-900">
                    {invoice.description}
                  </td>
                  <td className="py-4 text-sm font-medium text-gray-900">
                    {formatPrice(invoice.amount)}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(invoice.status)}
                      <span className="text-sm text-gray-600">
                        {getStatusText(invoice.status)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    {invoice.downloadUrl && (
                      <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        Télécharger
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>




      {/* Add Payment Method Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Ajouter une méthode de paiement</h3>
              <button 
                onClick={() => setShowAddPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddPaymentMethod} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de carte *
                </label>
                <input
                  name="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={newPaymentMethod.cardNumber}
                  onChange={handlePaymentMethodChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mois (MM) *
                  </label>
                  <input
                    name="expiryMonth"
                    type="text"
                    placeholder="12"
                    value={newPaymentMethod.expiryMonth}
                    onChange={handlePaymentMethodChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Année (AA) *
                  </label>
                  <input
                    name="expiryYear"
                    type="text"
                    placeholder="25"
                    value={newPaymentMethod.expiryYear}
                    onChange={handlePaymentMethodChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC *
                </label>
                <input
                  name="cvc"
                  type="text"
                  placeholder="123"
                  value={newPaymentMethod.cvc}
                  onChange={handlePaymentMethodChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom sur la carte *
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Jean Dupont"
                  value={newPaymentMethod.name}
                  onChange={handlePaymentMethodChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <input 
                  name="isDefault"
                  type="checkbox" 
                  checked={newPaymentMethod.isDefault}
                  onChange={handlePaymentMethodChange}
                  className="rounded" 
                />
                <label className="text-sm text-gray-700">
                  Définir comme méthode par défaut
                </label>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ajouter
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddPaymentModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Billing Address Modal */}
      {showBillingAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Modifier l'adresse de facturation</h3>
              <button 
                onClick={() => setShowBillingAddressModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleBillingAddressSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Entreprise (optionnel)
                  </label>
                  <input
                    name="company"
                    type="text"
                    value={billingAddress.company || ''}
                    onChange={handleBillingAddressChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet *
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={billingAddress.name}
                    onChange={handleBillingAddressChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={billingAddress.email}
                    onChange={handleBillingAddressChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={billingAddress.phone || ''}
                    onChange={handleBillingAddressChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse *
                </label>
                <input
                    name="address"
                    type="text"
                    value={billingAddress.address}
                    onChange={handleBillingAddressChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville *
                  </label>
                  <input
                    name="city"
                    type="text"
                    value={billingAddress.city}
                    onChange={handleBillingAddressChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Code postal *
                  </label>
                  <input
                    name="postalCode"
                    type="text"
                    value={billingAddress.postalCode}
                    onChange={handleBillingAddressChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pays *
                  </label>
                  <select
                    name="country"
                    value={billingAddress.country}
                    onChange={handleBillingAddressChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="Cameroun">Cameroun</option>
                    <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                    <option value="Sénégal">Sénégal</option>
                    <option value="République Démocratique du Congo">République Démocratique du Congo</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Togo">Togo</option>
                    <option value="Bénin">Bénin</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Mali">Mali</option>
                    <option value="Niger">Niger</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de TVA (optionnel)
                </label>
                <input
                  name="vatNumber"
                  type="text"
                  value={billingAddress.vatNumber || ''}
                  onChange={handleBillingAddressChange}
                  placeholder="FR12345678901"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex gap-3 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sauvegarder
                </button>
                <button
                  type="button"
                  onClick={() => setShowBillingAddressModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Usage Statistics */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Utilisation actuelle</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">3/5</div>
            <div className="text-sm text-gray-600">Projets utilisés</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">0.3/1</div>
            <div className="text-sm text-gray-600">Stockage (Go)</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{width: '30%'}}></div>
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-2">∞</div>
            <div className="text-sm text-gray-600">Requêtes API</div>
            <div className="text-xs text-gray-500 mt-1">Illimité avec Pro</div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <div className="font-medium text-yellow-800">Limite bientôt atteinte</div>
              <div className="text-sm text-yellow-700 mt-1">
                Vous approchez de la limite de votre plan gratuit. Passez au plan Pro pour débloquer plus de fonctionnalités.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Besoin d'aide ?</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Documentation</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Consultez notre guide complet sur la facturation et les abonnements.
                </p>
                <button className="text-blue-600 hover:text-blue-700 text-sm mt-2">
                  Voir la documentation →
                </button>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Support par email</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Notre équipe répond généralement sous 24h.
                </p>
                <button className="text-blue-600 hover:text-blue-700 text-sm mt-2">
                  Contacter le support →
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Communauté</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Rejoignez notre communauté pour échanger avec d'autres utilisateurs.
                </p>
                <button className="text-blue-600 hover:text-blue-700 text-sm mt-2">
                  Rejoindre →
                </button>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Mises à jour</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Restez informé des nouvelles fonctionnalités et améliorations.
                </p>
                <button className="text-blue-600 hover:text-blue-700 text-sm mt-2">
                  S'abonner →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center pt-6 border-t">
        <div className="text-sm text-gray-500">
          Dernière mise à jour: {formatDate(new Date().toISOString())}
        </div>
        <div className="flex gap-3">
          <button className="text-gray-600 hover:text-gray-900 text-sm">
            Politique de remboursement
          </button>
          <button className="text-gray-600 hover:text-gray-900 text-sm">
            Conditions d'utilisation
          </button>
          <button className="text-red-600 hover:text-red-700 text-sm">
            Annuler l'abonnement
          </button>
        </div>
      </div>
    </div>
  )
}
