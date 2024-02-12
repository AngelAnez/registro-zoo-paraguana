import { Router } from "express"
import { renderRegistro, addNewVisit } from "../controllers/registro.controller.js";
import { userConnected } from "../middlewares/userConnected.js";

const router = Router()

router.get("/registro", userConnected, renderRegistro)

router.post("/registro", userConnected, addNewVisit)

export default router