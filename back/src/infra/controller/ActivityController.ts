import { Request, Response } from "express";
import { ActivityRepositoryDatabase } from "../repository/ActivityRepository"
import { ProjectRepositoryDatabase } from "../repository/ProjectRepository";
import { GetActivityById } from "../../usecase/GetActivityById";
import { GetActivitiesByProject } from "../../usecase/GetActivitiesByProject"
import { CreateActivity } from "../../usecase/CreateActivity"
import { DeleteActivity } from "../../usecase/DeleteActivity"
import { ConcludeActivity } from "../../usecase/ConcludeActivity"
import { DateRangeError } from "../../error/DateRangeError";
import { NotFoundError } from "../../error/NotFoundError";

export class ActivityController {

  async get(request: Request, response: Response) {
    try {
      const activityRepository = new ActivityRepositoryDatabase()
      const getActivityById = new GetActivityById(activityRepository)
      const { id } = request.params
      const output = await getActivityById.execute({ activityId: id })
      return response.status(200).send({ 
        message: "Activity successfully retrieved",
        value: output
      })
    } catch (error) {
      if(error instanceof NotFoundError) return response.status(404).send({ message: error.message })
      return response.status(500).send({
        message: 'Error while getting activity by id',
        error
      })
    }
  }

  async list(request: Request, response: Response) {
    try {
      const activityRepository = new ActivityRepositoryDatabase()
      const projectRepository = new ProjectRepositoryDatabase()
      const getActivitiesByProject = new GetActivitiesByProject(activityRepository, projectRepository)
      const { id } = request.params
      const output = await getActivitiesByProject.execute({ projectId: id })
      return response.status(200).send({ 
        message: "Activities successfully listed",
        value: output
      })
    } catch (error) {
      if(error instanceof NotFoundError) return response.status(404).send({ message: error.message })
      return response.status(500).send({
        message: 'Error while listing activities by project',
        error
      })
    }
  }

  async create(request: Request, response: Response) {
    try {
      const activityRepository = new ActivityRepositoryDatabase()
      const projectRepository = new ProjectRepositoryDatabase()
      const createActivity = new CreateActivity(activityRepository, projectRepository)
      const input = request.body
      const output = await createActivity.execute(input)
      return response.status(201).send({ 
        message: "Activity successfully created",
        value: output
      })
    } catch (error) {
      if(error instanceof DateRangeError || error instanceof NotFoundError) return response.status(400).send({ message: error.message })
      return response.status(500).send({
        message: 'Error while creating activity',
        error
      })
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const activityRepository = new ActivityRepositoryDatabase()
      const deleteActivity = new DeleteActivity(activityRepository)
      const { id } = request.params
      await deleteActivity.execute({ activityId: id })
      return response.status(200).send({ message: "Activity successfully deleted" })
    } catch (error) {
      if(error instanceof NotFoundError) return response.status(404).send({ message: error.message })
      return response.status(500).send({
        message: "Error while deleting activity",
        error
      })
    }
  }

  async conclude(request: Request, response: Response) {
    try {
      const activityRepository = new ActivityRepositoryDatabase()
      const concludeActivity = new ConcludeActivity(activityRepository)
      const { id } = request.params
      await concludeActivity.execute({ activityId: id })
      return response.status(200).send({ message: "Activity successfully concluded" })
    } catch (error) {
      return response.status(500).send({
        message: "Error while concluding activity",
        error
      })
    }
  }
}