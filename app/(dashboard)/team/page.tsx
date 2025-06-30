"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Users, UserPlus, Mail, Crown, Shield, Edit3, Trash2, MoreVertical, Search, Filter, Loader2 } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
  status: 'active' | 'pending' | 'inactive'
  joinedAt: string
  avatar?: string
}

interface TeamInvite {
  email: string
  role: 'admin' | 'member' | 'viewer'
  message?: string
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'owner',
    status: 'active',
    joinedAt: '2023-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'admin',
    status: 'active',
    joinedAt: '2023-02-20',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'member',
    status: 'active',
    joinedAt: '2023-03-10',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'viewer',
    status: 'pending',
    joinedAt: '2023-04-05',
  },
]

export default function TeamPage() {
  const { toast } = useToast()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMember, setSelectedMember] = useState<string | null>(null)

  const [inviteForm, setInviteForm] = useState<TeamInvite>({
    email: '',
    role: 'member',
    message: ''
  })

  const handleInviteMember = async () => {
    if (!inviteForm.email) {
      toast({
        title: "Erreur",
        description: "L'adresse email est requise",
      })
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: inviteForm.email.split('@')[0],
        email: inviteForm.email,
        role: inviteForm.role,
        status: 'pending',
        joinedAt: new Date().toISOString().split('T')[0],
      }

      setTeamMembers(prev => [...prev, newMember])
      setInviteForm({ email: '', role: 'member', message: '' })
      setShowInviteModal(false)

      toast({
        title: "Invitation envoyée",
        description: `Une invitation a été envoyée à ${inviteForm.email}`,
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de l'invitation",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateRole = async (memberId: string, newRole: TeamMember['role']) => {
    try {
      setTeamMembers(prev => 
        prev.map(member => 
          member.id === memberId ? { ...member, role: newRole } : member
        )
      )
      toast({
        title: "Rôle mis à jour",
        description: "Le rôle du membre a été modifié avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la modification du rôle",
      })
    }
  }

  const handleRemoveMember = async (memberId: string) => {
    try {
      setTeamMembers(prev => prev.filter(member => member.id !== memberId))
      toast({
        title: "Membre supprimé",
        description: "Le membre a été retiré de l'équipe",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression",
      })
    }
  }

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterRole === 'all' || member.role === filterRole
    return matchesSearch && matchesFilter
  })

  const getRoleIcon = (role: TeamMember['role']) => {
    switch (role) {
      case 'owner': return <Crown className="w-4 h-4 text-yellow-500" />
      case 'admin': return <Shield className="w-4 h-4 text-blue-500" />
      default: return <Users className="w-4 h-4 text-gray-500" />
    }
  }

  const getRoleLabel = (role: TeamMember['role']) => {
    switch (role) {
      case 'owner': return 'Propriétaire'
      case 'admin': return 'Administrateur'
      case 'member': return 'Membre'
      case 'viewer': return 'Lecteur'
      default: return role
    }
  }

  const getStatusBadge = (status: TeamMember['status']) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Actif</span>
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">En attente</span>
      case 'inactive':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Inactif</span>
      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Gestion d'équipe</h1>
        <p className="text-gray-600 mt-1">
          Gérez les membres de votre équipe et leurs permissions.
        </p>
      </div>

      <div className="space-y-6">
        {/* Actions header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un membre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les rôles</option>
              <option value="owner">Propriétaire</option>
              <option value="admin">Administrateur</option>
              <option value="member">Membre</option>
              <option value="viewer">Lecteur</option>
            </select>
          </div>

          <button
            onClick={() => setShowInviteModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Inviter un membre
          </button>
        </div>

        {/* Team members list */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Membres de l'équipe ({filteredMembers.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredMembers.map((member) => (
              <div key={member.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                    ) : (
                      <span className="text-sm font-medium text-gray-600">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-gray-900">{member.name}</h3>
                      {getRoleIcon(member.role)}
                    </div>
                    <p className="text-sm text-gray-500">{member.email}</p>
                    <p className="text-xs text-gray-400">
                      Rejoint le {new Date(member.joinedAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {getStatusBadge(member.status)}
                  
                  <select
                    value={member.role}
                    onChange={(e) => handleUpdateRole(member.id, e.target.value as TeamMember['role'])}
                    disabled={member.role === 'owner'}
                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="owner">Propriétaire</option>
                    <option value="admin">Administrateur</option>
                    <option value="member">Membre</option>
                    <option value="viewer">Lecteur</option>
                  </select>

                  <div className="relative">
                    <button
                      onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    
                    {selectedMember === member.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <button
                          onClick={() => {
                            // Logic to edit member
                            setSelectedMember(null)
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          Modifier
                        </button>
                        {member.role !== 'owner' && (
                          <button
                            onClick={() => {
                              handleRemoveMember(member.id)
                              setSelectedMember(null)
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="px-6 py-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun membre trouvé</h3>
              <p className="text-gray-500">
                {searchTerm || filterRole !== 'all' 
                  ? "Aucun membre ne correspond à vos critères de recherche."
                  : "Commencez par inviter des membres dans votre équipe."
                }
              </p>
            </div>
          )}
        </div>

        {/* Team settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Paramètres d'équipe
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Invitations publiques</h3>
                <p className="text-sm text-gray-500">Permettre aux membres d'inviter d'autres personnes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Approbation des invitations</h3>
                <p className="text-sm text-gray-500">Nécessite l'approbation d'un admin pour rejoindre</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Inviter un nouveau membre
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="membre@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rôle
                </label>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, role: e.target.value as TeamInvite['role'] }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="viewer">Lecteur</option>
                  <option value="member">Membre</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message personnel (optionnel)
                </label>
                <textarea
                  value={inviteForm.message}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Un message de bienvenue..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowInviteModal(false)
                  setInviteForm({ email: '', role: 'member', message: '' })
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                onClick={handleInviteMember}
                disabled={isLoading || !inviteForm.email}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Envoi...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Envoyer l'invitation
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}