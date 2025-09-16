import { Router } from "express";
import { getNews, postNews } from "../controllers/news.controller.js";
import { validateToken } from "../middlewares/validateToken.js";
const router = Router()

router.get('/news', validateToken, getNews)

router.post('/news', validateToken, postNews)

export default router