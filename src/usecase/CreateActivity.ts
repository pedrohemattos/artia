import { Activity } from "../entity/Activity"
import { DateRangeError } from "../error/DateRangeError"
import { NotFoundError } from "../error/NotFoundError"
import { ActivityRepository } from "../infra/repository/ActivityRepository"
import { ProjectRepository } from "../infra/repository/ProjectRepository"

export class CreateActivity {

  constructor(
    readonly activityRepository: ActivityRepository, 
    readonly projectRepository: ProjectRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    if(input.startDate > input.endDate) throw new DateRangeError({ type: 'default' })
    const project = await this.projectRepository.getProjectById(input.projectId)
    if(!project) throw new NotFoundError('Project')
    if(input.startDate < project.startDate) throw new DateRangeError({ type: 'activity' })
    const activity = Activity.create(input.projectId, input.name, input.startDate, input.endDate)
    await this.activityRepository.saveActivity(activity)
    return {
      activityId: activity.activityId
    }
  }
}

type Input = {
  projectId: string
  name: string,
  startDate: Date,
  endDate: Date
}

type Output = {
  activityId: string
}