import { Router } from "express";
import { renderRegistro, renderLogin, verifyUser, getLogout, userRegister } from "../controllers/auth.controller.js";
import { activeSession } from "../middlewares/activeSession.js";

const router = Router()

router.get("/registro", activeSession, renderRegistro)

 router.post("/registro", userRegister)

router.get("/login", activeSession, renderLogin)

router.post("/login", verifyUser)

router.get("/logout", getLogout)

export default router