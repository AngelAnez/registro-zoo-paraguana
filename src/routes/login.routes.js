import { Router } from "express";
import { renderLogin, verifyUser } from "../controllers/login.controller.js";
import { renderRegistro } from "../controllers/registro.controller.js";

const router = Router()

router.get("/login", renderLogin)

router.post("/login", verifyUser)

export default router