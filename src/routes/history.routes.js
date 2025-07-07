import { Router } from "express"
import { modifyVisit, renderHistory } from "../controllers/history.controller.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.get("/history", validateToken, renderHistory)

router.post("/history", validateToken, modifyVisit)

export default router