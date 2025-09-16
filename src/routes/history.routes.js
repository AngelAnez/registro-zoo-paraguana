import { Router } from "express"
import { modifyVisit, getHistory } from "../controllers/history.controller.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.get("/history", validateToken, getHistory)

router.post("/history", validateToken, modifyVisit)

export default router