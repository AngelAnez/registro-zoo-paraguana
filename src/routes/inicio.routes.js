import { Router } from "express"
import { renderInicio, getDolarValue } from "../controllers/inicio.controller.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.get("/inicio", validateToken, renderInicio)

router.get("/dolar", validateToken, getDolarValue)

export default router