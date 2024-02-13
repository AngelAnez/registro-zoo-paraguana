import { Router } from "express";
import { renderRegistro } from "../controllers/registro.controller.js";
import { activeSession } from "../middlewares/activeSession.js";

const router = Router()

router.get("/registro", activeSession, renderRegistro)

export default router