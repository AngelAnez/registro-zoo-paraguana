import { Router } from "express"
import { validateToken } from "../middlewares/validateToken.js";
import { getAdmin, postAdmin } from "../controllers/admin.controller.js";

const router = Router()

router.get("/admin", validateToken, getAdmin)

router.post("/admin", validateToken, postAdmin)

export default router