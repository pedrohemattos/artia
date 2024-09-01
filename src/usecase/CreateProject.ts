import { Project } from "../entity/Project"
import { ProjectRepository } from "../infra/repository/ProjectRepository"
import { DateRangeError } from "../error/DateRangeError"

export class CreateProject {

  constructor(readonly projectRepository: ProjectRepository) {}

  async execute(input: Input): Promise<Output> {
    if(input.startDate > input.endDate) throw new DateRangeError({ type: 'default' })
    const project = Project.create(input.name, input.startDate, input.endDate)
    await this.projectRepository.saveProject(project)
    return {
      projectId: project.projectId
    }
  }
}

type Input = {
  name: string
  startDate: Date
  endDate: Date
}

type Output = {
  projectId: string
}