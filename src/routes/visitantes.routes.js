import { Router } from "express"
import { getVisitantes, addNewVisit } from "../controllers/visitantes.controller.js";
import { userConnected } from "../middlewares/userConnected.js";

const router = Router()

router.get("/visitantes", userConnected, getVisitantes)

router.post("/visitantes", userConnected, addNewVisit)

export default router