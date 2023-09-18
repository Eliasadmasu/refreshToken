import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:3001",
});

const AuthService = {
  register: async (userData) => {
    const response = await apiInstance.post("/auth/register", userData);

    if (response.status === 201) {
      return response; // Successful registration
    } else {
      throw new Error("Registration failed"); // Handle registration error
    }
  },
  login: async (credentials) => {
    const response = await apiInstance.post("/auth/login", credentials);

    if (response.status === 200) {
      return response; // Successful registration
    } else {
      throw new Error("Registration failed"); // Handle registration error
    }
  },
};
export default AuthService;
