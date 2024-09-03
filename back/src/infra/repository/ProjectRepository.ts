import { Project } from "../../entity/Project";
import { DatabaseConnection } from "../database/DatabaseConnection"

export interface ProjectRepository {
  saveProject(project: Project): Promise<void>
  getProjectById(id: string): Promise<Project | null>
  getAllProjects(): Promise<Project[]>
  updateProject(project: Project): Promise<void>
  deleteProject(id: string): Promise<void>
}

export class ProjectRepositoryDatabase extends DatabaseConnection implements ProjectRepository {

  async saveProject(project: Project) {
    await this.project.create({
      data: {
        projectId: project.projectId,
        name: project.name,
        startDate: project.startDate,
        endDate: project.endDate,
        completed: project.completed
      }
    })
  }

  async getProjectById(id: string) {
    const project = await this.project.findUnique({
      where: {
        projectId: id
      },
      include: {
        activities: true
      }
    })
    if(!project) return null
    return Project.restore(project.projectId, project.name, project.startDate, project.endDate, project.completed, project.activities)
  }

  async getAllProjects() {
    const projects = await this.project.findMany()
    return projects.map(project => Project.restore(project.projectId, project.name, project.startDate, project.endDate, project.completed))
  }

  async updateProject(project: Project) {
    await this.project.update({
      where: {
        projectId: project.projectId
      },
      data: {
        name: project.name,
        projectId: project.projectId,
        startDate: project.startDate,
        endDate: project.endDate,
        completed: project.completed
      }
    })
  }

  async deleteProject(id: string) {
    await this.project.delete({
      where: {
        projectId: id
      }
    })
  }
}