import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserTest",
    required: true,
  },
});

export default mongoose.model("PostTest", postSchema);
