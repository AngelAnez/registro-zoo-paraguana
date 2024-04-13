import { Router } from "express";
import { getNovedades } from "../controllers/novedades.controller.js";
import { validateToken } from "../middlewares/validateToken.js";
const router = Router()

router.get('/novedades', validateToken, getNovedades)

export default router