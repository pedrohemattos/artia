import { test, expect } from "vitest"
import { InMemoryProjectRepository } from "../../test/repository/InMemoryProjectRepository"
import { InMemoryActivityRepository } from "../../test/repository/InMemoryActivityRepository"
import { CreateActivity } from "../usecase/CreateActivity"
import { CreateProject } from "../usecase/CreateProject"
import { GetActivityById } from "../usecase/GetActivityById"
import { addDays } from "date-fns"

test('Deve buscar e retornar a atividade pelo seu id', async () => {
  const projectRepository = new InMemoryProjectRepository()
  const createProject = new CreateProject(projectRepository)
  const activityRepository = new InMemoryActivityRepository()
  const createActivity = new CreateActivity(activityRepository, projectRepository)
  const inputCreateProject = {
    name: "Projeto Artia",
    startDate: new Date(),
    endDate: addDays(new Date(), 10)
  }
  const outputCreateProject = await createProject.execute(inputCreateProject)
  const inputCreateActivity = {
    projectId: outputCreateProject.projectId,
    name: 'Atividade',
    startDate: new Date(),
    endDate: new Date()
  }
  const outputCreateActivity = await createActivity.execute(inputCreateActivity)
  const activityId = outputCreateActivity.activityId
  const getActivityById = new GetActivityById(activityRepository)
  const inputGetActivityById = {
    activityId
  }
  const outputGetActivityById = await getActivityById.execute(inputGetActivityById)
  expect(outputGetActivityById.activityId).toBe(activityId)
  expect(outputGetActivityById.name).toBe('Atividade')
})