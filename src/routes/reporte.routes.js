import { Router } from "express";
import { generateReport } from "../controllers/reporte.controller.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.post('/reporte', validateToken, generateReport)

export default router