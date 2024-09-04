import crypto from "node:crypto"
import { Activity } from "./Activity"

export class Project {

  private constructor(
    readonly projectId: string,
    readonly name: string,
    readonly startDate: Date,
    readonly endDate: Date,
    readonly completed: boolean,
    readonly progress?: number,
    readonly overdue?: boolean,
    readonly activities?: Activity[]
  ) {}

  static create(name: string, startDate: Date, endDate: Date) {
    const projectId = crypto.randomUUID()
    const completed = false
    return new Project(projectId, name, startDate, endDate, completed)
  }

  static restore(projectId: string, name: string, startDate: Date, endDate: Date, completed: boolean, activities?: Activity[]) {
    if(!activities) {
      return new Project(projectId, name, startDate, endDate, completed)
    }
    const progress = this.calculateProgress(activities)
    const overdue = this.checkOverdue(endDate, activities)
    return new Project(projectId, name, startDate, endDate, completed, progress, overdue, activities)
  }

  static calculateProgress(activities: Activity[]) {
    if(!activities.length) return 0
    const total = activities.length
    let totalCompleted = 0
    activities.forEach(activity => {
      if(activity.completed) totalCompleted++
    })
    return totalCompleted ? Number(((totalCompleted / total) * 100).toFixed(2)) : 0
  }

  static checkOverdue(projectEndDate: Date, activities: Activity[]) {
    const today = new Date()
    if(today > projectEndDate) return true
    if(!activities.length) return false
    for(const activity of activities) {
      if(activity.endDate > projectEndDate) return true
    }
    return false
  }
}