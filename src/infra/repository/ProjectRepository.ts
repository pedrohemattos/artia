import { Project } from "../../entity/Project";
import { DatabaseConnection } from "../database/DatabaseConnection"

export interface ProjectRepository {
  saveProject(project: Project): Promise<void>
  getProjectById(id: string): Promise<Project | null>
}

export class ProjectRepositoryDatabase extends DatabaseConnection implements ProjectRepository {

  async saveProject(project: Project) {
    await this.project.create({
      data: {
        ...project
      }
    })
  }

  async getProjectById(id: string) {
    const result = await this.project.findUnique({
      where: {
        projectId: id
      }
    })
    if(!result) return null
    return Project.restore(result.projectId, result.name, result.startDate, result.endDate)
  }
}