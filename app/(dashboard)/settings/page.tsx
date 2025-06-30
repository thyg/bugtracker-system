"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsProfile } from "@/components/settings/settings-profile"
import { SettingsAccount } from "@/components/settings/settings-account"
import { SettingsNotifications } from "@/components/settings/settings-notifications"
import { SettingsSecurity } from "@/components/settings/settings-security"
import { User, Bell, Shield } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">Gérez votre compte et vos préférences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="hidden md:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="hidden md:inline">Compte</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
      
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="hidden md:inline">Sécurité</span>
          </TabsTrigger>
          
        </TabsList>

        <TabsContent value="profile">
          <SettingsProfile />
        </TabsContent>

        <TabsContent value="account">
          <SettingsAccount />
        </TabsContent>

        <TabsContent value="notifications">
          <SettingsNotifications />
        </TabsContent>

        <TabsContent value="security">
          <SettingsSecurity />
        </TabsContent>

      </Tabs>
    </div>
  )
}
