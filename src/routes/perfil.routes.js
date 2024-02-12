import { Router } from "express"
import { renderPerfil } from "../controllers/perfil.controller.js"
const router = Router()

router.get("/perfil", renderPerfil)

export default router