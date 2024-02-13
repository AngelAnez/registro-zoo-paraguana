import { Router } from "express";
import { activeSession, renderLogin, verifyUser } from "../controllers/login.controller.js";

const router = Router()

router.get("/login", activeSession, renderLogin)

router.post("/login", verifyUser, router.get("/login", renderLogin))

export default router