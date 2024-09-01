import { Request, Response } from "express";
import { ProjectRepositoryDatabase } from "../repository/ProjectRepository"
import { CreateProject } from "../../usecase/CreateProject"
import { DateRangeError } from "../../error/DateRangeError";
import { NotFoundError } from "../../error/NotFoundError";
import { GetProjectById } from "../../usecase/GetProjectById";

export class ProjectController {

  async get(request: Request, response: Response) {
    try {
      const projectRepository = new ProjectRepositoryDatabase()
      const getProjectById = new GetProjectById(projectRepository)
      const { id } = request.params
      const output = await getProjectById.execute({ projectId: id })
      return response.status(200).send({ 
        message: "Project successfully retrieved",
        value: output
      })
    } catch (error) {
      if(error instanceof NotFoundError) return response.status(404).send({ message: error.message })
      return response.status(500).send({
        message: 'Error while getting project by id',
        error
      })
    }
  }

  async create(request: Request, response: Response) {
    try {
      const projectRepository = new ProjectRepositoryDatabase()
      const createProject = new CreateProject(projectRepository)
      const input = request.body
      const output = await createProject.execute(input)
      return response.status(201).send({ 
        message: "Project successfully created",
        value: output
      })
    } catch (error) {
      if(error instanceof DateRangeError) return response.status(400).send({ message: error.message })
      return response.status(500).send({
        message: 'Error while creating project',
        error
      })
    }
  }
}