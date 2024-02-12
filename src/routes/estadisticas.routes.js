import { Router } from "express"
import { renderEstadisticas } from "../controllers/estadisticas.controller.js";
import { userConnected } from "../middlewares/userConnected.js";

const router = Router()

router.get("/estadisticas", userConnected, renderEstadisticas)

export default router