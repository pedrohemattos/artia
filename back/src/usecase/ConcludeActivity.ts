import { ActivityRepository } from "../infra/repository/ActivityRepository"
import { NotFoundError } from "../error/NotFoundError"

export class ConcludeActivity {

  constructor(readonly activityRepository: ActivityRepository) {}

  async execute(input: Input): Promise<void> {
    const activity = await this.activityRepository.getActivityById(input.activityId)
    if(!activity) throw new NotFoundError('Activity')
    await this.activityRepository.updateActivity({
      ...activity,
      completed: true
    })
  }
}

type Input = {
  activityId: string
}