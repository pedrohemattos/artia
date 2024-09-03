import { Router } from "express"
import { ActivityController } from "../controller/ActivityController"
import { ActivityValidateSchema } from "../validators/ActivityValidateSchema"

const activityRouter = Router()

const activityController = new ActivityController()

activityRouter.get("/activity/:id", activityController.get)
activityRouter.post("/activity", activityController.create)
activityRouter.delete("/activity/:id", activityController.delete)
activityRouter.patch("/conclude-activity/:id", activityController.conclude)

export default activityRouter