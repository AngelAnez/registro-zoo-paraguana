import { Router } from "express"
import { getAjustes, changeConfig} from "../controllers/ajustes.controller.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.get("/ajustes", validateToken, getAjustes)

router.post("/ajustes", validateToken, changeConfig)

export default router