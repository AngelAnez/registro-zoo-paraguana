import { Router } from "express"
import { renderAjustes } from "../controllers/ajustes.controller.js";

const router = Router()

router.get("/ajustes", renderAjustes)

export default router