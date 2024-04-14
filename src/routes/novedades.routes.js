import { Router } from "express";
import { getNews, postNews } from "../controllers/novedades.controller.js";
import { validateToken } from "../middlewares/validateToken.js";
const router = Router()

router.get('/novedades', validateToken, getNews)

router.post('/novedades', validateToken, postNews)

export default router