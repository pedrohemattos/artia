import { Activity } from "../entity/Activity"
import { ActivityRepository } from "../infra/repository/ActivityRepository"
import { ProjectRepository } from "../infra/repository/ProjectRepository"
import { NotFoundError } from "../error/NotFoundError"

export class GetActivitiesByProject {

  constructor(readonly activityRepository: ActivityRepository, readonly projectRepository: ProjectRepository) {}

  async execute(input: Input): Promise<Output> {
    const project = await this.projectRepository.getProjectById(input.projectId)
    if(!project) throw new NotFoundError("Project")
    const activities = await this.activityRepository.getActivitiesByProject(input.projectId)
    return {
      activities
    }
  }
}

type Input = {
  projectId: string
}

type Output = {
  activities: Activity[]
}