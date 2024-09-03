import { Router } from "express";
import projectRouter from "../route/ProjectRoute"
import activityRouter from "./ActivityRoute";

const router = Router()

router.use(projectRouter, activityRouter)

export default router