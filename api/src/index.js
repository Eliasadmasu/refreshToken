import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import db from "./db/db.js";
import router from "./routes/authRoute.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors());

app.use("/auth/", router);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
