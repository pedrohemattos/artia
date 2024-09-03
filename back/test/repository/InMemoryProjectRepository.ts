import { Project } from "../../src/entity/Project";
import { ProjectRepository } from "../../src/infra/repository/ProjectRepository";

export class InMemoryProjectRepository implements ProjectRepository {
  private projects: Project[] = []
  
  async saveProject(project: Project) {
    this.projects.push(project)
  }
  
  async getProjectById(id: string) {
    const project = this.projects.find(project => project.projectId === id)
    if(!project) return null
    return project
  }
  
  async getAllProjects() {
    return this.projects
  }

  async updateProject(project: Project): Promise<void> {
    const { projectId } = project
    const index = this.projects.findIndex(project => project.projectId === projectId)
    this.projects.splice(index, 1, project)
  }

  async deleteProject(id: string) {
    const index = this.projects.findIndex(project => project.projectId === id)
    this.projects.splice(index, 1)
  }
}