import { useEffect, useState } from "react";
import protectedInstance from "./axiosConfig";

const Protected = () => {
  const [data, setData] = useState("");
  const protectedRoute = async () => {
    const response = await protectedInstance.get("/auth/protected");
    console.log(response);
    if (response.status === 200) {
      setData(response.data.message);
    }
  };

  useEffect(() => {
    protectedRoute();
  }, []);

  return (
    <div>
      <div style={{ color: "green" }}> {data}</div>
      Protected
    </div>
  );
};
export default Protected;
