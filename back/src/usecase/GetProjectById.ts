import { ProjectRepository } from "../infra/repository/ProjectRepository"
import { NotFoundError } from "../error/NotFoundError"

export class GetProjectById {

  constructor(readonly projectRepository: ProjectRepository) {}

  async execute(input: Input): Promise<Output> {
    const project = await this.projectRepository.getProjectById(input.projectId)
    if(!project) throw new NotFoundError('Project')
    return project;
  }
}

type Input = {
  projectId: string
}

type Output = {
  projectId: string
  name: string
  startDate: Date
  endDate: Date  
}