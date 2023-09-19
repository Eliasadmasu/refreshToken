import { useState } from "react";
import Cookies from "js-cookie";
import protectedInstance from "./Protected/axiosConfig";
import { newtokenrefresher } from "../tokenRefresher";

const Create = () => {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    await newtokenrefresher(() => {
      console.log("refreshed token");
    });

    //get access token from the cookie
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      console.error("Access token not found. Please log in.");
      return;
    }

    try {
      const response = await protectedInstance.post(
        "http://localhost:3001/auth/create",
        { title }
      );
      console.log(response);
    } catch (error) {
      console.error("Error creating title:", error);
    }
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleCreatePost}
      >
        <label>Title</label>
        <input
          type="text"
          placeholder="Title"
          onChange={handleChange}
          value={title}
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};
export default Create;
