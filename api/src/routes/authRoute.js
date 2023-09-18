import express from "express";
import {
  login,
  refreshTokens,
  register,
} from "../controllers/authController.js";
import { verifyAccessToken } from "../../middleware/verifyToken.js";
import { protectedRoute } from "../controllers/Dataroute.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/protected", verifyAccessToken, protectedRoute);

router.get("/refresh", refreshTokens);

export default router;
