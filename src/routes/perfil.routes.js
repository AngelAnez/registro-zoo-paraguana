import { Router } from "express"
import { getPerfil } from "../controllers/perfil.controller.js"
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.get("/perfil", validateToken, getPerfil)

export default router