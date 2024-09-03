import { Project } from "../entity/Project";
import { ProjectRepository } from "../infra/repository/ProjectRepository";

export class GetAllProjects {

  constructor(readonly projectRepository: ProjectRepository) {}

  async execute(): Promise<Output> {
    const projects = await this.projectRepository.getAllProjects()
    return {
      projects
    }
  }
}

type Output = {
  projects: Project[]
}