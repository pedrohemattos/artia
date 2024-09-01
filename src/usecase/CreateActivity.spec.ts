import { expect, test, beforeEach } from "vitest";
import { CreateActivity } from "./CreateActivity";
import { InMemoryActivityRepository } from "../../test/repository/InMemoryActivityRepository"
import { InMemoryProjectRepository } from "../../test/repository/InMemoryProjectRepository"
import { addDays, subDays } from "date-fns";
import { DateRangeError } from "../error/DateRangeError";
import { CreateProject } from "./CreateProject";

let projectRepository: InMemoryProjectRepository
let activityRepository: InMemoryActivityRepository
let createProject: CreateProject
let createActivity: CreateActivity

beforeEach(() => {
  projectRepository = new InMemoryProjectRepository()
  activityRepository = new InMemoryActivityRepository()
  createProject = new CreateProject(projectRepository)
  createActivity = new CreateActivity(activityRepository, projectRepository)
})

test('Deve criar uma atividade', async () => {
  const inputCreateProject = {
    name: "Projeto Artia",
    startDate: new Date(),
    endDate: addDays(new Date(), 10)
  }
  const outputCreateProject = await createProject.execute(inputCreateProject)
  const inputCreateActivity = {
    projectId: outputCreateProject.projectId,
    name: 'Atividade 1',
    startDate: new Date(),
    endDate: addDays(new Date, 5)
  }
  const outputCreateActivity = await createActivity.execute(inputCreateActivity)
  expect(outputCreateActivity.activityId).toBeDefined()
})

test('Não deve permitir criar uma atividade com data final anterior a data inicial', async () => {
  const inputCreateProject = {
    name: "Projeto Artia 2",
    startDate: new Date(),
    endDate: addDays(new Date(), 5)
  }
  const outputCreateProject = await createProject.execute(inputCreateProject)
  const inputCreateActivity = {
    projectId: outputCreateProject.projectId,
    name: "Atividade 2",
    startDate: new Date(),
    endDate: subDays(new Date, 10)
  }
  await expect(createActivity.execute(inputCreateActivity)).rejects.toThrow(DateRangeError)
})