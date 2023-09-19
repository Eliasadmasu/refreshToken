import express from "express";
import {
  login,
  refreshTokens,
  register,
} from "../controllers/authController.js";
import { verifyAccessToken } from "../../middleware/verifyToken.js";
import { createPost, protectedRoute } from "../controllers/Dataroute.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/protected", verifyAccessToken, protectedRoute);

//create
router.post("/create", verifyAccessToken, createPost);

router.post("/refresh", refreshTokens);

export default router;
