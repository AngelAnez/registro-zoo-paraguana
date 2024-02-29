import { Router } from "express"
import { getEstadisticas, postEstadisticas } from "../controllers/estadisticas.controller.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.get("/estadisticas", validateToken, getEstadisticas)

router.post("/estadisticas", validateToken, postEstadisticas)

export default router