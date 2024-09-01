import { Project } from "../../entity/Project";
import { DatabaseConnection } from "../database/DatabaseConnection"

export interface ProjectRepository {
  saveProject(project: Project): Promise<void>
  getProjectById(id: string): Promise<Project | null>
  getAllProjects(): Promise<Project[]>
}

export class ProjectRepositoryDatabase extends DatabaseConnection implements ProjectRepository {

  async saveProject(project: Project) {
    await this.project.create({
      data: {
        projectId: project.projectId,
        name: project.name,
        startDate: project.startDate,
        endDate: project.endDate
      }
    })
  }

  async getProjectById(id: string) {
    const result = await this.project.findUnique({
      where: {
        projectId: id
      },
      include: {
        activities: true
      }
    })
    if(!result) return null
    return Project.restore(result.projectId, result.name, result.startDate, result.endDate, result.activities)
  }

  async getAllProjects() {
    const result = await this.project.findMany()
    return result.map(project => Project.restore(project.projectId, project.name, project.startDate, project.endDate))
  }
}