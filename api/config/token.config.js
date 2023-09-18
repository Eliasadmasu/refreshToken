import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./auth.confog.js";

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET, {
    expiresIn: "20s", // You can adjust the expiration time
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user._id }, REFRESH_TOKEN_SECRET, {
    expiresIn: "1m",
  });
};

export { generateAccessToken, generateRefreshToken };
