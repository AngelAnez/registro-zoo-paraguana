import { Router } from "express"
import { renderHome, getDolarValue } from "../controllers/home.controller.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.get("/home", validateToken, renderHome)

router.get("/dolar", validateToken, getDolarValue)

export default router