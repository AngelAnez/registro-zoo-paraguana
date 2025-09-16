import { Router } from "express";
import {
  renderRegister,
  renderLogin,
  verifyUser,
  getLogout,
  userRegister,
} from "../controllers/auth.controller.js";
import { activeSession } from "../middlewares/activeSession.js";

const router = Router();

router.get("/register", activeSession, renderRegister);

router.post("/register", userRegister);

router.get("/login", activeSession, renderLogin);

router.post("/login", verifyUser);

router.get("/logout", getLogout);

export default router;
