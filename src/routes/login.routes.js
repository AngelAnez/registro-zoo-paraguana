import { Router } from "express";
import { renderLogin, verifyUser } from "../controllers/login.controller.js";
import { activeSession } from "../middlewares/activeSession.js";

const router = Router()

router.get("/login", activeSession, renderLogin)

router.post("/login", verifyUser)

export default router