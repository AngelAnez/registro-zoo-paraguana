import { Router } from "express"
import { renderPerfil } from "../controllers/perfil.controller.js"
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.get("/perfil", validateToken, renderPerfil)

export default router