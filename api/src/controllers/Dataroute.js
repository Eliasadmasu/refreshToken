import PostModel from "../model/PostModel.js";

const protectedRoute = (req, res) => {
  res.json({ message: "Protected route accessed successfully" });
};

const createPost = async (req, res) => {
  const { title } = req.body;

  //user
  const userId = req.userId;
  console.log({ userId });

  try {
    //create title
    const Title = new PostModel({
      title,
      user: userId,
    });

    //save title
    await Title.save();

    //return res
    return res.status(201).json({ message: "Title created successfully" });
  } catch (error) {
    console.error("Error creating title:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { protectedRoute, createPost };
