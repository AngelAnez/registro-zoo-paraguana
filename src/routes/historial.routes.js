import { Router } from "express"
import { renderHistorial } from "../controllers/historial.controller.js";
import { userConnected } from "../middlewares/userConnected.js";

const router = Router()

router.get("/historial", userConnected, renderHistorial)

export default router