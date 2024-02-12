import { Router } from "express"
import { renderInicio, getDolarValue } from "../controllers/inicio.controller.js";
import { userConnected } from "../middlewares/userConnected.js";

const router = Router()

router.get("/inicio", userConnected, renderInicio)

router.get("/dolar", userConnected, getDolarValue)

export default router