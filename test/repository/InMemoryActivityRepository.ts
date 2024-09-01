import { Activity } from "../../src/entity/Activity";
import { ActivityRepository } from "../../src/infra/repository/ActivityRepository";

export class InMemoryActivityRepository implements ActivityRepository {

  private activities: Activity[] = []

  async saveActivity(activity: Activity) {
    this.activities.push(activity)
  }

  async getActivityById(id: string) {
    const activity = this.activities.find(activity => activity.activityId === id)
    if(!activity) return null
    return activity
  }

}