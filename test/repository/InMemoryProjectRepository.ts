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

}