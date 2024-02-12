import { Router } from "express"
import { renderEstadisticas } from "../controllers/estadisticas.controller.js";

const router = Router()

router.get("/estadisticas", renderEstadisticas)

export default router