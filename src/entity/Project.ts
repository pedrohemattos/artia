import crypto from "node:crypto"

export class Project {

  private constructor(
    readonly projectId: string,
    readonly name: string,
    readonly startDate: Date,
    readonly endDate: Date
  ) {}

  static create(name: string, startDate: Date, endDate: Date) {
    const projectId = crypto.randomUUID()
    return new Project(projectId, name, startDate, endDate)
  }

  static restore(projectId: string, name: string, startDate: Date, endDate: Date) {
    return new Project(projectId, name, startDate, endDate)
  }
}