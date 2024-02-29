import { Router } from "express"
import { renderHistorial } from "../controllers/historial.controller.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.get("/historial", validateToken, renderHistorial)

export default router