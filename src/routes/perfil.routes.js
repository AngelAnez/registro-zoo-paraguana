import { Router } from "express"
import { changePerfil, getPerfil } from "../controllers/perfil.controller.js"
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.get("/perfil", validateToken, getPerfil)

router.post("/perfil", validateToken, changePerfil)

export default router