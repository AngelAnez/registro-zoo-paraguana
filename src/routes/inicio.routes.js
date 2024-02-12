import { Router } from "express"
import { renderInicio, getDolarValue } from "../controllers/inicio.controller.js";

const router = Router()

router.get("/inicio", renderInicio)

router.get("/dolar", getDolarValue)

export default router