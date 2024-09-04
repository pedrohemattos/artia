import { useEffect, useState } from "react"
import axios from "axios"
import CreateProjectModal from "./components/CreateProjectModal"
import ProjectsTable from "./components/ProjectsTable"
import ProjectModal from "./components/ProjectModal"
import { Project } from "./types"

function App() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState('')
  const [createProjectOpen, setCreateProjectOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const handleRowClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    setDetailsOpen(true);
  };

  const getProjects = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/project")
      setProjects(data.value.projects)
    } catch (error) {}
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <div className="w-3/5 mx-auto py-8">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Projetos</h1>
        <button
          className="bg-teal-300 hover:bg-teal-400 text-white font-bold px-4 py-2 rounded-lg"
          onClick={() => setCreateProjectOpen(true)}
        >
          + Criar projeto
        </button>
      </div>
      <ProjectsTable 
        projects={projects} 
        onRowClick={handleRowClick} 
      />
     <ProjectModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        projectId={selectedProjectId}
        onProjectConcluded={getProjects}
      />
      <CreateProjectModal 
        open={createProjectOpen} 
        onClose={() => setCreateProjectOpen(false)} 
        onProjectCreated={getProjects} 
      />
    </div>
  )
}

export default App
