import { Router } from "express";
import { generateReport } from "../controllers/reporte.controller.js";

const router = Router()

router.post('/reporte', generateReport)

export default router