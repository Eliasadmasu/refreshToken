import { useState } from "react";
import AuthService from "../AuthService";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useAuth } from "../../context/UserContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  //context
  const { setAccessToken } = useAuth();

  //navigate
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(credentials);
      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;

        console.log("Login successful:", response);
        Cookie.set("accessToken", accessToken, {
          expires: 20 / 86400,
          secure: true,
        });
        Cookie.set("refreshToken", refreshToken, {
          expires: 20 / 1440,
          secure: true,
        });
        setAccessToken(accessToken);
        navigate("/protected");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="frmCont">
      <h2>Login</h2>
      <form className="frm" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
