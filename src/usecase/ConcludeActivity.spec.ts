import { expect, test, beforeEach } from "vitest";
import { CreateProject } from "./CreateProject";
import { CreateActivity } from "./CreateActivity";
import { ConcludeActivity } from "./ConcludeActivity"
import { GetActivityById } from "./GetActivityById"
import { InMemoryActivityRepository } from "../../test/repository/InMemoryActivityRepository"
import { InMemoryProjectRepository } from "../../test/repository/InMemoryProjectRepository"
import { addDays } from "date-fns";

let projectRepository: InMemoryProjectRepository
let activityRepository: InMemoryActivityRepository
let createProject: CreateProject
let createActivity: CreateActivity
let concludeActivity: ConcludeActivity
let getActivityById: GetActivityById

beforeEach(() => {
  projectRepository = new InMemoryProjectRepository()
  activityRepository = new InMemoryActivityRepository()
  createProject = new CreateProject(projectRepository)
  createActivity = new CreateActivity(activityRepository, projectRepository)
  concludeActivity = new ConcludeActivity(activityRepository)
  getActivityById = new GetActivityById(activityRepository)
})

test('Deve concluir uma atividade', async () => {
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
  const { activityId } = await createActivity.execute(inputCreateActivity)
  await concludeActivity.execute({ activityId })
  const outputGetActivityById = await getActivityById.execute({ activityId })
  expect(outputGetActivityById.completed).toBe(true)
})