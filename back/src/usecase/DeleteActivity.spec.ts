import { test, expect } from "vitest"
import { InMemoryProjectRepository } from "../../test/repository/InMemoryProjectRepository"
import { InMemoryActivityRepository } from "../../test/repository/InMemoryActivityRepository"
import { CreateActivity } from "../usecase/CreateActivity"
import { CreateProject } from "../usecase/CreateProject"
import { DeleteActivity } from "../usecase/DeleteActivity"
import { GetActivityById } from "../usecase/GetActivityById"
import { addDays } from "date-fns"
import { NotFoundError } from "../error/NotFoundError"

test('Deve deletar a atividade', async () => {
  const projectRepository = new InMemoryProjectRepository()
  const createProject = new CreateProject(projectRepository)
  const activityRepository = new InMemoryActivityRepository()
  const createActivity = new CreateActivity(activityRepository, projectRepository)
  const deleteActivity = new DeleteActivity(activityRepository)
  const getActivityById = new GetActivityById(activityRepository)
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
  await deleteActivity.execute({ activityId })
  await expect(getActivityById.execute({ activityId })).rejects.toThrow(NotFoundError)
})