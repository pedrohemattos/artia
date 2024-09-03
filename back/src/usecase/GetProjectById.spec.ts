import { test, expect } from "vitest"
import { InMemoryProjectRepository } from "../../test/repository/InMemoryProjectRepository"
import { CreateProject } from "../usecase/CreateProject"
import { GetProjectById } from "../usecase/GetProjectById"

test('Deve buscar e retornar o projeto pelo seu id', async () => {
  const projectRepository = new InMemoryProjectRepository()
  const createProject = new CreateProject(projectRepository)
  const inputCreateProject = {
    name: 'Projeto',
    startDate: new Date(),
    endDate: new Date()
  }
  const outputCreateProject = await createProject.execute(inputCreateProject)
  const projectId = outputCreateProject.projectId

  const getProjectById = new GetProjectById(projectRepository)
  const inputGetProjectById = {
    projectId
  }
  const outputGetProjectById = await getProjectById.execute(inputGetProjectById)
  expect(outputGetProjectById.projectId).toBe(projectId)
  expect(outputGetProjectById.name).toBe('Projeto')
})