import { Router } from "express"
import { renderPerfil } from "../controllers/perfil.controller.js"
import { userConnected } from "../middlewares/userConnected.js";

const router = Router()

router.get("/perfil", userConnected, renderPerfil)

export default router