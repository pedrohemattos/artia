import { ActivityRepository } from "../infra/repository/ActivityRepository"
import { NotFoundError } from "../error/NotFoundError"

export class GetActivityById {

  constructor(readonly activityRepository: ActivityRepository) {}

  async execute(input: Input): Promise<Output> {
    const activity = await this.activityRepository.getActivityById(input.activityId)
    if(!activity) throw new NotFoundError('Activity')
    return {
      activityId: activity.activityId,
      projectId: activity.projectId,
      name: activity.name,
      startDate: activity.startDate,
      endDate: activity.endDate,
      completed: activity.completed
    };
  }
}

type Input = {
  activityId: string
}

type Output = {
  activityId: string
  projectId: string
  name: string
  startDate: Date
  endDate: Date
  completed: boolean
}