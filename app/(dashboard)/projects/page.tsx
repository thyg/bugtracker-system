"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProjectCard } from "@/components/specific/project-card"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalTrigger } from "@/components/ui/modal"
import { Plus, Search } from "lucide-react"
import { useApi } from "@/hooks/use-api"
import { projectsApi } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { data: projects, loading, refetch } = useApi(projectsApi.getAll)

  const filteredProjects = projects?.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.platform.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projets</h1>
          <p className="text-muted-foreground">Gérez vos projets et surveillez leur état</p>
        </div>
        <Modal>
          <ModalTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau projet
            </Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Créer un nouveau projet</ModalTitle>
            </ModalHeader>
            <div className="p-4">
              <p className="text-muted-foreground">Fonctionnalité à implémenter...</p>
            </div>
          </ModalContent>
        </Modal>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des projets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects?.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => {
                // Navigation vers le détail du projet
                window.location.href = `/projects/${project.id}`
              }}
            />
          ))}
        </div>
      )}

      {filteredProjects?.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun projet trouvé</p>
        </div>
      )}
    </div>
  )
}
