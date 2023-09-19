import Cookies from "js-cookie";
import axios from "axios";

const protectedInstance = axios.create({
  baseURL: "http://localhost:3001",
});

protectedInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default protectedInstance;
