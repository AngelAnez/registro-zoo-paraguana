import { Router } from "express"
import { renderHistorial } from "../controllers/historial.controller.js";
const router = Router()

router.get("/historial", renderHistorial)

export default router