import { Router } from "express"
import { validateToken } from "../middlewares/validateToken.js";
import { getAdmin } from "../controllers/admin.controller.js";

const router = Router()

router.get("/admin", validateToken, getAdmin)

export default router