import { Router } from "express"
import { getVisitantes, addNewVisit } from "../controllers/visitantes.controller.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.get("/visitantes", validateToken, getVisitantes)

router.post("/visitantes", validateToken, addNewVisit)

export default router