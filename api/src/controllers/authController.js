import { REFRESH_TOKEN_SECRET } from "../../config/auth.confog.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../config/token.config.js";
import UsersModel from "../model/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await UsersModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Create a new user
    const user = new UsersModel({ username, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await UsersModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate and send access and refresh tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 60 * 1000,
      secure: process.env.NODE_ENV === "production", // Set to true in production
    });

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const refreshTokens = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const auth = req;

    console.log({ refreshToken });

    if (!refreshToken) {
      return res.status(403).json({ message: "No refresh token provided" });
    }

    // Verify the refresh token
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      try {
        // Find the user by ID (you may need to adjust this based on your User model)
        const user = await UsersModel.findById(decoded.userId).exec();

        if (!user) {
          return res.status(403).json({ message: "User not found" });
        }

        // Generate a new access token
        const accessToken = generateAccessToken(user);

        // Send the new access token
        return res.status(200).json({ accessToken });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { register, login, refreshTokens };
