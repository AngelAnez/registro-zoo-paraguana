import { Router } from "express";
import { getStats, postStats } from "../controllers/stats.controller.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router();

router.get("/stats", validateToken, getStats);

router.post("/stats", validateToken, postStats);

export default router;
