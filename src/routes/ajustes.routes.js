import { Router } from "express"
import { getAjustes, changeConfig} from "../controllers/ajustes.controller.js";
import { userConnected } from "../middlewares/userConnected.js";

const router = Router()

router.get("/ajustes", userConnected, getAjustes)

router.post("/ajustes", userConnected, changeConfig)

export default router