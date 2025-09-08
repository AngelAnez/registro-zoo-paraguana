import { Router } from "express"
import { updateProfile, getProfile } from "../controllers/profile.controller.js"
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.get("/profile", validateToken, getProfile)

router.post("/profile", validateToken, updateProfile)

export default router