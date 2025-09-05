import { Router } from "express"
import { getSettings, updateSettings} from "../controllers/settings.controller.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.get("/settings", validateToken, getSettings)

router.post("/settings", validateToken, updateSettings)

export default router