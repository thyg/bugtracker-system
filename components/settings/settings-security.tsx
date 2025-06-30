"use client"

import { useState } from "react"
import { Shield, Key, Smartphone, Clock, Eye, EyeOff, AlertTriangle, CheckCircle, XCircle, Copy, Trash2, Plus, Settings, Lock, Unlock, Globe, Monitor, MapPin } from "lucide-react"

interface SecurityLog {
  id: string
  action: string
  device: string
  location: string
  ip: string
  timestamp: string
  status: 'success' | 'failed' | 'suspicious'
}

interface ActiveSession {
  id: string
  device: string
  browser: string
  location: string
  ip: string
  lastActive: string
  current: boolean
}

interface TwoFactorMethod {
  id: string
  type: 'app' | 'sms' | 'email'
  name: string
  identifier: string
  enabled: boolean
  verified: boolean
}

const mockSecurityLogs: SecurityLog[] = [
  {
    id: '1',
    action: 'Connexion réussie',
    device: 'Windows PC',
    location: 'Douala, Cameroun',
    ip: '102.37.154.20',
    timestamp: '2023-11-01T08:15:30Z',
    status: 'success'
  },
  {
    id: '2',
    action: 'Tentative de connexion échouée',
    device: 'Android Phone',
    location: 'Yaoundé, Cameroun',
    ip: '197.254.12.33',
    timestamp: '2023-10-25T21:05:10Z',
    status: 'failed'
  },
  {
    id: '3',
    action: 'Changement de mot de passe',
    device: 'MacBook Pro',
    location: 'Bafoussam, Cameroun',
    ip: '196.203.45.78',
    timestamp: '2023-09-15T14:47:50Z',
    status: 'success'
  },
  {
    id: '4',
    action: 'Connexion suspecte bloquée',
    device: 'iPhone 14',
    location: 'Kribi, Cameroun',
    ip: '196.8.23.190',
    timestamp: '2023-08-30T03:22:05Z',
    status: 'suspicious'
  },
  {
    id: '5',
    action: 'Connexion réussie',
    device: 'Linux Desktop',
    location: 'Garoua, Cameroun',
    ip: '102.88.159.11',
    timestamp: '2023-07-20T11:12:00Z',
    status: 'success'
  },
  {
    id: '6',
    action: 'Tentative de connexion échouée',
    device: 'Tablet',
    location: 'Bertoua, Cameroun',
    ip: '197.46.67.54',
    timestamp: '2023-06-05T17:30:45Z',
    status: 'failed'
  },
  {
    id: '7',
    action: 'Connexion suspecte bloquée',
    device: 'Smart TV',
    location: 'Ebolowa, Cameroun',
    ip: '196.14.200.99',
    timestamp: '2023-05-12T22:55:20Z',
    status: 'suspicious'
  }
]

const mockActiveSessions: ActiveSession[] = [
  {
    id: '1',
    device: 'Windows PC',
    browser: 'Chrome 115',
    location: 'Douala, Cameroun',
    ip: '102.37.154.20',
    lastActive: '2023-11-01T08:15:30Z',
    current: true
  },
  {
    id: '2',
    device: 'iPhone 13',
    browser: 'Safari Mobile',
    location: 'Yaoundé, Cameroun',
    ip: '197.254.12.33',
    lastActive: '2023-10-25T21:05:10Z',
    current: false
  },
  {
    id: '3',
    device: 'Android Tablet',
    browser: 'Chrome Mobile',
    location: 'Bafoussam, Cameroun',
    ip: '196.203.45.78',
    lastActive: '2023-09-15T14:47:50Z',
    current: false
  },
  {
    id: '4',
    device: 'MacBook Air',
    browser: 'Safari 16',
    location: 'Bamenda, Cameroun',
    ip: '102.88.159.11',
    lastActive: '2023-07-20T11:12:00Z',
    current: false
  }
]

const mockTwoFactorMethods: TwoFactorMethod[] = [
  {
    id: '1',
    type: 'app',
    name: 'Google Authenticator',
    identifier: 'Configuré',
    enabled: true,
    verified: true
  },
  {
    id: '2',
    type: 'sms',
    name: 'SMS',
    identifier: '+237 6** ** ** 45',
    enabled: false,
    verified: true
  },
  {
    id: '3',
    type: 'email',
    name: 'Email de sauvegarde',
    identifier: 'backup@*****.com',
    enabled: true,
    verified: true
  }
]

export function SettingsSecurity() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [securityLogs] = useState<SecurityLog[]>(mockSecurityLogs)
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>(mockActiveSessions)
  const [twoFactorMethods, setTwoFactorMethods] = useState<TwoFactorMethod[]>(mockTwoFactorMethods)
  const [isLoading, setIsLoading] = useState(false)
  const [loginNotifications, setLoginNotifications] = useState(true)
  const [suspiciousActivityAlerts, setSuspiciousActivityAlerts] = useState(true)
  const [twoFactorRequired, setTwoFactorRequired] = useState(true)

  const toast = (options: {title: string, description: string}) => {
    alert(`${options.title}: ${options.description}`)
  }

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Erreur",
        description: "Tous les champs sont requis",
      })
      return
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
      })
      return
    }

    if (newPassword.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères",
      })
      return
    }

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      toast({
        title: "Mot de passe modifié",
        description: "Votre mot de passe a été mis à jour avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du changement de mot de passe",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTerminateSession = (sessionId: string) => {
    setActiveSessions(prev => prev.filter(session => session.id !== sessionId))
    toast({
      title: "Session fermée",
      description: "La session a été fermée avec succès",
    })
  }

  const handleToggleTwoFactor = (methodId: string) => {
    setTwoFactorMethods(prev =>
      prev.map(method =>
        method.id === methodId
          ? { ...method, enabled: !method.enabled }
          : method
      )
    )
  }

  const getStatusIcon = (status: SecurityLog['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'suspicious':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      default:
        return null
    }
  }

  const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes('iphone') || device.toLowerCase().includes('android')) {
      return <Smartphone className="w-4 h-4" />
    }
    return <Monitor className="w-4 h-4" />
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copié",
      description: "Adresse IP copiée dans le presse-papiers",
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Shield className="w-6 h-6 mr-2" />
          Sécurité
        </h1>
        <p className="text-gray-600 mt-1">
          Gérez vos paramètres de sécurité et surveillez l'activité de votre compte.
        </p>
      </div>

      <div className="space-y-8">
        {/* Changement de mot de passe */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
            <Key className="w-5 h-5 mr-2" />
            Changer le mot de passe
          </h2>
          
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe actuel
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleChangePassword}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Modification..." : "Changer le mot de passe"}
            </button>
          </div>
        </div>

        {/* Authentification à deux facteurs */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Smartphone className="w-5 h-5 mr-2" />
              Authentification à deux facteurs
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Obligatoire</span>
              <button
                onClick={() => setTwoFactorRequired(!twoFactorRequired)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  twoFactorRequired ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    twoFactorRequired ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {twoFactorMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                <div className="flex items-center space-x-3">
                  <div className="text-gray-600">
                    {method.type === 'app' && <Smartphone className="w-5 h-5" />}
                    {method.type === 'sms' && <Smartphone className="w-5 h-5" />}
                    {method.type === 'email' && <Globe className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{method.name}</h4>
                    <p className="text-sm text-gray-500">{method.identifier}</p>
                  </div>
                  {method.verified && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleTwoFactor(method.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      method.enabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        method.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <button className="mt-4 flex items-center px-4 py-2 text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une méthode
          </button>
        </div>

        {/* Sessions actives */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
            <Monitor className="w-5 h-5 mr-2" />
            Sessions actives
          </h2>
          
          <div className="space-y-3">
            {activeSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                <div className="flex items-center space-x-3">
                  {getDeviceIcon(session.device)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{session.device}</h4>
                      {session.current && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                          Session actuelle
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{session.browser}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {session.location}
                      </span>
                      <span 
                        className="flex items-center cursor-pointer hover:text-gray-700"
                        onClick={() => copyToClipboard(session.ip)}
                      >
                        <Globe className="w-3 h-3 mr-1" />
                        {session.ip}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDate(session.lastActive)}
                      </span>
                    </div>
                  </div>
                </div>
                {!session.current && (
                  <button
                    onClick={() => handleTerminateSession(session.id)}
                    className="flex items-center px-3 py-1 text-red-600 border border-red-200 rounded-md hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Fermer
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Notifications de sécurité */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Notifications de sécurité
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Notifications de connexion</h4>
                <p className="text-sm text-gray-500">Recevoir un email à chaque nouvelle connexion</p>
              </div>
              <button
                onClick={() => setLoginNotifications(!loginNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  loginNotifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    loginNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Alertes d'activité suspecte</h4>
                <p className="text-sm text-gray-500">Être averti des tentatives de connexion suspectes</p>
              </div>
              <button
                onClick={() => setSuspiciousActivityAlerts(!suspiciousActivityAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  suspiciousActivityAlerts ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    suspiciousActivityAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Journal de sécurité */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
            <Clock className="w-5 h-5 mr-2" />
            Journal de sécurité
          </h2>
          
          <div className="space-y-3">
            {securityLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(log.status)}
                  <div>
                    <h4 className="font-medium text-gray-900">{log.action}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        {getDeviceIcon(log.device)}
                        <span className="ml-1">{log.device}</span>
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {log.location}
                      </span>
                      <span 
                        className="flex items-center cursor-pointer hover:text-gray-700"
                        onClick={() => copyToClipboard(log.ip)}
                      >
                        <Globe className="w-3 h-3 mr-1" />
                        {log.ip}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(log.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}