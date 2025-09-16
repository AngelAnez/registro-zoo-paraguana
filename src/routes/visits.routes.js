import { Router } from "express"
import { getVisitantes, addNewVisit } from "../controllers/visits.controller.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.get("/visits", validateToken, getVisitantes)

router.post("/visits", validateToken, addNewVisit)

export default router