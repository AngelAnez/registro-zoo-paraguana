import { Router } from "express"
import { getEstadisticas, postEstadisticas } from "../controllers/estadisticas.controller.js";
import { userConnected } from "../middlewares/userConnected.js";

const router = Router()

router.get("/estadisticas", userConnected, getEstadisticas)

router.post("/estadisticas", userConnected, postEstadisticas)

export default router