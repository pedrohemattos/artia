import crypto from "node:crypto"

export class Activity {

  private constructor(
    readonly activityId: string,
    readonly projectId: string,
    readonly name: string,
    readonly startDate: Date,
    readonly endDate: Date,
    readonly completed: boolean
  ) {}

  static create(projectId: string, name: string, startDate: Date, endDate: Date) {
    const activityId = crypto.randomUUID()
    const completed = false;
    return new Activity(activityId, projectId, name, startDate, endDate, completed)
  }

  static restore(activityId: string, projectId: string, name: string, startDate: Date, endDate: Date, completed: boolean) {
    return new Activity(activityId, projectId, name, startDate, endDate, completed)
  }
}