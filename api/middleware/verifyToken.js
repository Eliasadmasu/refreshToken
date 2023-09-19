import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/auth.confog.js";

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token", err });
    }

    const userId = decoded.userId;
    console.log("Valid token");
    req.userId = userId;
    next();
  });
};

export { verifyAccessToken };
