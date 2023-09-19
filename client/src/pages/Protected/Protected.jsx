import { useEffect, useState } from "react";
import protectedInstance from "./axiosConfig";
import { useNavigate } from "react-router-dom";
import { newtokenrefresher } from "../../tokenRefresher";

const Protected = () => {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  const protectedRoute = async () => {
    await newtokenrefresher();

    try {
      const response = await protectedInstance.get("/auth/protected");
      console.log(response);
      if (response.status === 200) {
        setData(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log("403 Forbidden");
        navigate("/login"); // Replace "/login" with the actual path to your login page
      } else {
        console.error("Protected route failed:", error);
      }
    }
  };

  useEffect(() => {
    protectedRoute();
  }, []);

  return (
    <div>
      <div style={{ color: "green", fontSize: "50px" }}> {data}</div>
      Protected
    </div>
  );
};
export default Protected;
