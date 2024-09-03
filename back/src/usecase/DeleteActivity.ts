import { NotFoundError } from "../error/NotFoundError"
import { ActivityRepository } from "../infra/repository/ActivityRepository"

export class DeleteActivity {
  constructor(readonly activityRepository: ActivityRepository) {}

  async execute(input: Input): Promise<void> {
    const activity = await this.activityRepository.getActivityById(input.activityId)
    if(!activity) throw new NotFoundError('Activity')
    await this.activityRepository.deleteActivity(input.activityId)
  } 
}

type Input = {
  activityId: string
}