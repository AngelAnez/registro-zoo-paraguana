import { Router } from "express"
import { renderVisitantes, addNewVisit } from "../controllers/visitantes.controller.js";
import { userConnected } from "../middlewares/userConnected.js";

const router = Router()

router.get("/visitantes", userConnected, renderVisitantes)

router.post("/visitantes", userConnected, addNewVisit)

export default router