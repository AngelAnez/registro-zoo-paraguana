import { Router } from "express"
import { renderRegistro, addNewVisit } from "../controllers/registro.controller.js";

const router = Router()

router.get("/registro", renderRegistro)

router.post("/registro", addNewVisit)

export default router