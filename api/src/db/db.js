import "dotenv/config";
import mongoose from "mongoose";

const db = mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

export default db; // Export the Mongoose connection
