import { ProjectRepository } from "../infra/repository/ProjectRepository"
import { NotFoundError } from "../error/NotFoundError"
import { AlreadyConcludedError } from "../error/AlreadyConcludedError"

export class ConcludeProject {

  constructor(readonly projectRepository: ProjectRepository) {}

  async execute(input: Input): Promise<void> {
    const project = await this.projectRepository.getProjectById(input.projectId)
    if(!project) throw new NotFoundError('Project')
    if(project.completed) throw new AlreadyConcludedError('Project')
    await this.projectRepository.updateProject({
      ...project,
      completed: true
    })
  }
}

type Input = {
  projectId: string
}
