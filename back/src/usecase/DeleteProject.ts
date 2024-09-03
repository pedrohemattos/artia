import { NotFoundError } from "../error/NotFoundError"
import { ProjectRepository } from "../infra/repository/ProjectRepository"

export class DeleteProject {
  constructor(readonly projectRepository: ProjectRepository) {}

  async execute(input: Input): Promise<void> {
    const project = await this.projectRepository.getProjectById(input.projectId)
    if(!project) throw new NotFoundError('Project')
    await this.projectRepository.deleteProject(input.projectId)
  } 
}

type Input = {
  projectId: string
}