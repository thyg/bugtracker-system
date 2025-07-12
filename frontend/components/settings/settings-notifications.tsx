"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Bell, Mail, Smartphone, Monitor, Volume2, MessageSquare, Calendar, Users, Shield, Loader2 } from "lucide-react"

interface NotificationSettings {
  email: {
    marketing: boolean
    security: boolean
    updates: boolean
    comments: boolean
    mentions: boolean
    projectUpdates: boolean
  }
  push: {
    enabled: boolean
    marketing: boolean
    security: boolean
    updates: boolean
    comments: boolean
    mentions: boolean
    projectUpdates: boolean
  }
  desktop: {
    enabled: boolean
    sound: boolean
    badge: boolean
  }
  frequency: {
    instant: boolean
    daily: boolean
    weekly: boolean
    never: boolean
  }
}

export function SettingsNotifications() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      marketing: true,
      security: true,
      updates: false,
      comments: true,
      mentions: true,
      projectUpdates: true,
    },
    push: {
      enabled: true,
      marketing: false,
      security: true,
      updates: true,
      comments: true,
      mentions: true,
      projectUpdates: true,
    },
    desktop: {
      enabled: true,
      sound: true,
      badge: true,
    },
    frequency: {
      instant: true,
      daily: false,
      weekly: false,
      never: false,
    }
  })

  const updateSetting = (category: keyof NotificationSettings, key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
  }

  const updateFrequency = (key: string) => {
    setSettings(prev => ({
      ...prev,
      frequency: {
        instant: false,
        daily: false,
        weekly: false,
        never: false,
        [key]: true
      }
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast({
        title: "Paramètres sauvegardés",
        description: "Vos préférences de notifications ont été mises à jour.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const NotificationToggle = ({ 
    checked, 
    onChange, 
    label, 
    description 
  }: { 
    checked: boolean
    onChange: (checked: boolean) => void
    label: string
    description?: string 
  }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-900">{label}</label>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-1">
          Gérez vos préférences de notifications pour rester informé de ce qui vous importe.
        </p>
      </div>

      <div className="space-y-6">
        {/* Notifications par email */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Notifications par email
          </h2>
          
          <div className="space-y-1 divide-y divide-gray-100">
            <NotificationToggle
              checked={settings.email.security}
              onChange={(checked) => updateSetting('email', 'security', checked)}
              label="Alertes de sécurité"
              description="Notifications importantes concernant votre compte"
            />
            <NotificationToggle
              checked={settings.email.mentions}
              onChange={(checked) => updateSetting('email', 'mentions', checked)}
              label="Mentions et messages"
              description="Quand quelqu'un vous mentionne ou vous envoie un message"
            />
            <NotificationToggle
              checked={settings.email.projectUpdates}
              onChange={(checked) => updateSetting('email', 'projectUpdates', checked)}
              label="Mises à jour de projets"
              description="Activité sur vos projets et collaborations"
            />
            <NotificationToggle
              checked={settings.email.comments}
              onChange={(checked) => updateSetting('email', 'comments', checked)}
              label="Commentaires"
              description="Nouveaux commentaires sur vos publications"
            />
            <NotificationToggle
              checked={settings.email.updates}
              onChange={(checked) => updateSetting('email', 'updates', checked)}
              label="Mises à jour produit"
              description="Nouvelles fonctionnalités et améliorations"
            />
            <NotificationToggle
              checked={settings.email.marketing}
              onChange={(checked) => updateSetting('email', 'marketing', checked)}
              label="Communications marketing"
              description="Offres spéciales, conseils et newsletters"
            />
          </div>
        </div>

        {/* Notifications push */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Smartphone className="w-5 h-5 mr-2" />
            Notifications push
          </h2>
          
          <div className="mb-4">
            <NotificationToggle
              checked={settings.push.enabled}
              onChange={(checked) => updateSetting('push', 'enabled', checked)}
              label="Activer les notifications push"
              description="Recevez des notifications sur vos appareils"
            />
          </div>

          {settings.push.enabled && (
            <div className="space-y-1 divide-y divide-gray-100 ml-4 border-l-2 border-gray-100 pl-4">
              <NotificationToggle
                checked={settings.push.security}
                onChange={(checked) => updateSetting('push', 'security', checked)}
                label="Alertes de sécurité"
              />
              <NotificationToggle
                checked={settings.push.mentions}
                onChange={(checked) => updateSetting('push', 'mentions', checked)}
                label="Mentions et messages"
              />
              <NotificationToggle
                checked={settings.push.projectUpdates}
                onChange={(checked) => updateSetting('push', 'projectUpdates', checked)}
                label="Mises à jour de projets"
              />
              <NotificationToggle
                checked={settings.push.comments}
                onChange={(checked) => updateSetting('push', 'comments', checked)}
                label="Commentaires"
              />
              <NotificationToggle
                checked={settings.push.updates}
                onChange={(checked) => updateSetting('push', 'updates', checked)}
                label="Mises à jour produit"
              />
            </div>
          )}
        </div>

        {/* Notifications desktop */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Monitor className="w-5 h-5 mr-2" />
            Notifications bureau
          </h2>
          
          <div className="space-y-1 divide-y divide-gray-100">
            <NotificationToggle
              checked={settings.desktop.enabled}
              onChange={(checked) => updateSetting('desktop', 'enabled', checked)}
              label="Notifications bureau"
              description="Afficher les notifications sur votre bureau"
            />
            <NotificationToggle
              checked={settings.desktop.sound}
              onChange={(checked) => updateSetting('desktop', 'sound', checked)}
              label="Son des notifications"
              description="Jouer un son lors des notifications"
            />
            <NotificationToggle
              checked={settings.desktop.badge}
              onChange={(checked) => updateSetting('desktop', 'badge', checked)}
              label="Badge de notification"
              description="Afficher un badge sur l'icône de l'application"
            />
          </div>
        </div>

        {/* Fréquence des notifications */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Fréquence des notifications
          </h2>
          
          <div className="space-y-3">
            {[
              { key: 'instant', label: 'Instantané', description: 'Recevez les notifications immédiatement' },
              { key: 'daily', label: 'Quotidien', description: 'Résumé quotidien de votre activité' },
              { key: 'weekly', label: 'Hebdomadaire', description: 'Résumé hebdomadaire de votre activité' },
              { key: 'never', label: 'Jamais', description: 'Désactiver toutes les notifications non critiques' }
            ].map((option) => (
              <label key={option.key} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="frequency"
                  checked={settings.frequency[option.key as keyof typeof settings.frequency]}
                  onChange={() => updateFrequency(option.key)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sauvegarde...
              </>
            ) : (
              "Sauvegarder les préférences"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}