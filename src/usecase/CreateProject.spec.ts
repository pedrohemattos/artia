import { beforeEach, expect, test } from "vitest"
import { CreateProject } from "./CreateProject"
import { addDays, subDays } from "date-fns"
import { InMemoryProjectRepository } from "../../test/repository/InMemoryProjectRepository"
import { DateRangeError } from "../error/DateRangeError"

let projectRepository: InMemoryProjectRepository
let createProject: CreateProject

beforeEach(() => {
  projectRepository = new InMemoryProjectRepository()
  createProject = new CreateProject(projectRepository)
})

test('Deve criar um projeto', async () => {
  const inputCreateProject = {
    name: "Projeto Artia",
    startDate: new Date(),
    endDate: addDays(new Date(), 10)
  }
  const outputCreateProject = await createProject.execute(inputCreateProject)
  expect(outputCreateProject?.projectId).toBeDefined()
})

test('Não deve permitir criar um projeto com data final anterior a data inicial', async () => {
  const inputCreateProject = {
    name: "Projeto Artia",
    startDate: new Date(),
    endDate: subDays(new Date, 10)
  }
  await expect(createProject.execute(inputCreateProject)).rejects.toThrow(DateRangeError)
})