"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts"
import {
  AlertTriangle,
  AlertCircle,
  Info,
  ArrowLeft,
  User,
  Clock,
  CheckCircle,
  XCircle,
  ChevronLeftIcon, 
  ChevronRightIcon,
  MessageSquare,
  Code,
  BarChart3,
  Send,
  Bug,
  Shield,
  TrendingUp,
  Users,
  MapPin,
  Calendar
} from "lucide-react"

const occurrenceOptions = [
  '5k','25k','50k','100k','200k','300k','400k','500k','1M','1.5M','2M'
];

const plans = [
  { 
    name: 'Étudiant', 
    price: '0 FCFA', 
    per: '/mois', 
    features: { 
      includedVolume: '5 000 / mois', 
      retention: '30 jours', 
      customizableRetention: false, 
      onDemand: false, 
      rateLimits: false 
    } 
  },
  { 
    name: 'Essentiel', 
    price: '11 400 FCFA', 
    per: '/mois', 
    features: { 
      includedVolume: '25K - 50M / mois', 
      retention: '90 jours', 
      customizableRetention: true, 
      onDemand: true, 
      rateLimits: true 
    } 
  },
  { 
    name: 'Avancé', 
    price: '23 400 FCFA', 
    per: '/mois', 
    features: { 
      includedVolume: '25K - 50M / mois', 
      retention: '180 jours', 
      customizableRetention: true, 
      onDemand: true, 
      rateLimits: true 
    } 
  },
  { 
    name: 'Entreprise', 
    price: 'Sur mesure', 
    per: '', 
    features: { 
      includedVolume: 'Personnalisé', 
      retention: 'Personnalisé', 
      customizableRetention: true, 
      onDemand: true, 
      rateLimits: true 
    } 
  }
];

// Données pour les graphiques (contexte camerounais)
const monthlyErrorData = [
  { mois: 'Jan', erreurs: 1250, résolues: 1100 },
  { mois: 'Fév', erreurs: 1800, résolues: 1650 },
  { mois: 'Mar', erreurs: 2200, résolues: 2000 },
  { mois: 'Avr', erreurs: 1950, résolues: 1850 },
  { mois: 'Mai', erreurs: 2400, résolues: 2300 },
  { mois: 'Jun', erreurs: 2100, résolues: 2050 }
];

const errorTypeData = [
  { type: 'Erreurs de Connexion', count: 850, color: '#e74c3c' },
  { type: 'Erreurs de Base de Données', count: 650, color: '#f39c12' },
  { type: 'Erreurs de Validation', count: 450, color: '#3498db' },
  { type: 'Erreurs de Performance', count: 300, color: '#2ecc71' },
  { type: 'Autres', count: 200, color: '#9b59b6' }
];

const cityPerformanceData = [
  { ville: 'Yaoundé', performance: 95, erreurs: 320 },
  { ville: 'Douala', performance: 92, erreurs: 480 },
  { ville: 'Garoua', performance: 88, erreurs: 180 },
  { ville: 'Bamenda', performance: 90, erreurs: 220 },
  { ville: 'Bafoussam', performance: 89, erreurs: 165 }
];

const teamMembers = [
  { nom: 'Nkomo Jean-Pierre', role: 'Lead Developer', ville: 'Yaoundé', avatar: 'JP' },
  { nom: 'Mballa Célestine', role: 'QA Engineer', ville: 'Douala', avatar: 'MC' },
  { nom: 'Fogue Emmanuel', role: 'DevOps', ville: 'Bafoussam', avatar: 'FE' },
  { nom: 'Atangana Marie', role: 'Backend Dev', ville: 'Yaoundé', avatar: 'AM' }
];

export default function CameroonBugTracker() {
  const [billing, setBilling] = useState('monthly');
  const [selectedOcc, setSelectedOcc] = useState('25k');
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-red-50 to-yellow-50 font-sans">
      {/* Header avec couleurs du Cameroun */}
      <header className="bg-gradient-to-r from-green-600 via-red-600 to-yellow-500 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bug className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Abonnement</h1>
                <p className="text-sm opacity-90">Solution camerounaise de détection et correction d'erreurs pour développeurs et entreprises.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-5 w-5" />
              <span>Yaoundé, Cameroun</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Tableau de Bord</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Tarification</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Équipe</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Analyses</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Erreurs Détectées</CardTitle>
                  <Bug className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,450</div>
                  <p className="text-xs text-muted-foreground">Ce mois-ci</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Erreurs Résolues</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,350</div>
                  <p className="text-xs text-muted-foreground">Taux: 95.9%</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Temps Moyen</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.3h</div>
                  <p className="text-xs text-muted-foreground">Résolution</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">Développeurs</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tendance des Erreurs (6 derniers mois)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyErrorData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mois" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="erreurs" stackId="1" stroke="#e74c3c" fill="#e74c3c" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="résolues" stackId="2" stroke="#2ecc71" fill="#2ecc71" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Types d'Erreurs</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={errorTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {errorTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Performance par ville */}
            <Card>
              <CardHeader>
                <CardTitle>Performance par Ville Camerounaise</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cityPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ville" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="performance" fill="#2ecc71" name="Performance %" />
                    <Bar dataKey="erreurs" fill="#e74c3c" name="Nombre d'erreurs" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choisissez Votre Plan</h2>
              <p className="text-gray-600">Tarifs adaptés au marché camerounais</p>
            </div>

            <section className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-yellow-50 p-6 rounded-lg border-2 border-green-200">
                <h2 className="text-lg font-medium text-gray-700">Votre plan actuel</h2>
                <p className="text-3xl font-bold mt-2 text-green-600">Étudiant</p>
                <span className="text-gray-500">0 FCFA / mois</span>
                <div className="mt-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Plan Gratuit</Badge>
                </div>
              </div>

              <div className="border-2 border-blue-500 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                <h2 className="text-lg font-medium text-gray-700 uppercase">Passer au plan</h2>
                <p className="text-2xl font-bold mt-1 text-blue-600">Avancé</p>

                <div className="mt-4 space-y-2">
                  <label className="flex items-center space-x-2 px-4 py-2 border rounded cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="billing"
                      value="monthly"
                      checked={billing === 'monthly'}
                      onChange={() => setBilling('monthly')}
                      className="form-radio text-blue-600"
                    />
                    <span>Facturation mensuelle</span>
                  </label>
                  <label className="flex items-center space-x-2 px-4 py-2 border rounded cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="billing"
                      value="annual"
                      checked={billing === 'annual'}
                      onChange={() => setBilling('annual')}
                      className="form-radio text-blue-600"
                    />
                    <span>Facturation annuelle (2 mois gratuits)</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 ml-2">Économie!</Badge>
                  </label>
                </div>

                <p className="mt-4 text-xl font-semibold">23,400 FCFA <span className="text-gray-500">/ mois</span></p>
                <Button className="mt-6 w-full bg-green-600 hover:bg-green-700">
                  Continuer vers le paiement →
                </Button>
              </div>
            </section>

            {/* Sélecteur de limite d'occurrence */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-gray-700 font-medium mb-4">Limite d'occurrences (par mois)</h3>
              <div className="flex items-center space-x-2 overflow-x-auto py-4">
                <button className="p-2 border rounded hover:bg-gray-50">
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                {occurrenceOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSelectedOcc(opt)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                      selectedOcc === opt 
                        ? 'bg-blue-500 text-white shadow-md' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
                <button className="p-2 border rounded hover:bg-gray-50">
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Votre limite d'occurrences contrôle le nombre d'erreurs que votre compte peut traiter chaque mois.
              </p>
            </section>

            {/* Tableau de comparaison des plans */}
            <section className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-gradient-to-r from-green-100 to-yellow-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Fonctionnalités</th>
                    {plans.map(plan => (
                      <th key={plan.name} className="px-6 py-4 text-center">
                        <div className="space-y-2">
                          <div className="font-semibold text-lg">{plan.name}</div>
                          <div className="text-xl font-bold text-blue-600">{plan.price}</div>
                          <div className="text-gray-500 text-sm">{plan.per}</div>
                          <Button 
                            size="sm"
                            variant={plan.name === 'Avancé' ? 'default' : 'outline'}
                            className={plan.name === 'Avancé' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                          >
                            {plan.name === 'Avancé' ? 'Sélectionné' : 
                             plan.name === 'Entreprise' ? 'Nous Contacter' : 'Choisir'}
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Volume d'événements inclus</td>
                    {plans.map(p => (
                      <td key={p.name} className="px-6 py-4 text-center">{p.features.includedVolume}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Rétention maximale des données</td>
                    {plans.map(p => (
                      <td key={p.name} className="px-6 py-4 text-center">{p.features.retention}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Rétention personnalisable</td>
                    {plans.map(p => (
                      <td key={p.name} className="px-6 py-4 text-center">
                        {p.features.customizableRetention ? 
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : 
                          <XCircle className="h-5 w-5 text-gray-400 mx-auto" />
                        }
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Événements à la demande</td>
                    {plans.map(p => (
                      <td key={p.name} className="px-6 py-4 text-center">
                        {p.features.onDemand ? 
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : 
                          <XCircle className="h-5 w-5 text-gray-400 mx-auto" />
                        }
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Limites de taux personnalisables</td>
                    {plans.map(p => (
                      <td key={p.name} className="px-6 py-4 text-center">
                        {p.features.rateLimits ? 
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : 
                          <XCircle className="h-5 w-5 text-gray-400 mx-auto" />
                        }
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </section>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe Camerounaise</h2>
              <p className="text-gray-600">Des experts dévoués à la qualité de vos applications</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarFallback className="text-lg font-bold bg-gradient-to-r from-green-400 to-yellow-400 text-white">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{member.nom}</CardTitle>
                    <Badge variant="secondary" className="mx-auto">{member.role}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{member.ville}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Team Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Performance de l'Équipe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">98.5%</div>
                    <p className="text-gray-600">Taux de résolution</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">1.8h</div>
                    <p className="text-gray-600">Temps moyen de réponse</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                    <p className="text-gray-600">Support disponible</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Analyses Détaillées</h2>
              <p className="text-gray-600">Insights sur les performances de votre système</p>
            </div>

            {/* Métriques avancées */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Évolution Mensuelle des Erreurs</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyErrorData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mois" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="erreurs" stroke="#e74c3c" strokeWidth={3} />
                      <Line type="monotone" dataKey="résolues" stroke="#2ecc71" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition Géographique</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cityPerformanceData.map((city, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-gray-500" />
                          <span className="font-medium">{city.ville}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant={city.performance > 90 ? 'default' : 'secondary'}>
                            {city.performance}% performance
                          </Badge>
                          <span className="text-sm text-gray-600">{city.erreurs} erreurs</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alertes et notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Alertes Récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">Pic d'erreurs détecté à Douala</p>
                      <p className="text-sm text-gray-600">Il y a 2 heures - 45 nouvelles erreurs</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 border-l-4 border-green-400 rounded">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Mise à jour système déployée avec succès</p>
                      <p className="text-sm text-gray-600">Il y a 4 heures - Toutes les régions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                    <Info className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Maintenance programmée ce weekend</p>
                      <p className="text-sm text-gray-600">Samedi 2:00 - 4:00 AM (GMT+1)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer camerounais */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-6">
          
          <Separator className="my-6 bg-gray-700" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Fièrement développé au Cameroun 🇨🇲
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Badge variant="outline" className="text-green-400 border-green-400">
                Sécurisé
              </Badge>
              <Badge variant="outline" className="text-blue-400 border-blue-400">
                ISO 27001
              </Badge>
              <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                Support 24/7
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}