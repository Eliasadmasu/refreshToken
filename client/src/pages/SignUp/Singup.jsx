import { useState } from "react";
import "../form.css";
import AuthService from "../AuthService";
import { useNavigate } from "react-router-dom";

const Singup = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.register(userData);

      if (response.status === 201) {
        console.log("Registration successful:", response);
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message); // Assuming your server sends an error message in the response
      }
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="frmCont">
      <h2>Register</h2>
      <h3 style={{ color: "red" }}>{error}</h3>
      <form className="frm" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          value={userData.username}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={userData.password}
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};
export default Singup;
