import { Activity } from "../../entity/Activity"
import { DatabaseConnection } from "../database/DatabaseConnection"

export interface ActivityRepository {
  saveActivity(activity: Activity): Promise<void>
  getActivityById(id: string): Promise<Activity | null>
  getActivitiesByProject(projectId: string): Promise<Activity[]>
  deleteActivity(id: string): Promise<void>
}

export class ActivityRepositoryDatabase extends DatabaseConnection implements ActivityRepository {

  async saveActivity(activity: Activity) {
    await this.activity.create({
      data: {
        ...activity
      }
    })
  }

  async getActivityById(id: string) {
    const result = await this.activity.findUnique({
      where: {
        activityId: id
      }
    })
    if(!result) return null
    return Activity.restore(result.activityId, result.projectId, result.name, result.startDate, result.endDate, result.completed)
  }

  async getActivitiesByProject(projectId: string) {
    const result = await this.activity.findMany({
      where: {
        projectId
      }
    })
    return result.map(activity => Activity.restore(activity.activityId, activity.projectId, activity.name, activity.startDate, activity.endDate, activity.completed))
  }

  async deleteActivity(id: string) {
    await this.activity.delete({
      where: {
        activityId: id
      }
    })
  }
}