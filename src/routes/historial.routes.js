import { Router } from "express"
import { modifyVisit, renderHistorial } from "../controllers/historial.controller.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.get("/historial", validateToken, renderHistorial)

router.post("/historial", validateToken, modifyVisit)

export default router