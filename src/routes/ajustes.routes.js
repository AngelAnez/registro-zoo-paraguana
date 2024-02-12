import { Router } from "express"
import { renderAjustes } from "../controllers/ajustes.controller.js";
import { userConnected } from "../middlewares/userConnected.js";

const router = Router()

router.get("/ajustes", userConnected, renderAjustes)

export default router