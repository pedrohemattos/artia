import { Router } from "express"
import { ProjectController } from "../controller/ProjectController"

const projectRouter = Router()

const projectController = new ProjectController()

projectRouter.get("/project/:id", projectController.get)
projectRouter.get("/project", projectController.list)
projectRouter.post("/project", projectController.create)

export default projectRouter