import { Router } from "express"
import { ActivityController } from "../controller/ActivityController"

const activityRouter = Router()

const activityController = new ActivityController()

activityRouter.get("/activity/:id", activityController.get)
activityRouter.post("/activity", activityController.create)
activityRouter.delete("/activity/:id", activityController.delete)

export default activityRouter