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

protectedInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const accessToken = Cookies.get("accessToken");

    // Handle errors globally here
    if (error.response) {
      if (error.response.status === 401) {
        const refreshToken = await protectedInstance.get("/auth/refresh", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(refreshToken);
        // // Unauthorized (e.g., token expired)

        // const newAccessToken = refreshToken.data.accessToken;
        // console.log({ newAccessToken });
        // protectedInstance.defaults.headers.common[
        //   "Authorization"
        // ] = `Bearer ${newAccessToken}`;

        // return refreshToken;
      }
    } else if (error.request) {
      // The request was made, but no response was received
      console.error("Request error:", error.request);
      // Handle or display error messages as needed
    } else {
      // Something happened in setting up the request
      console.error("Request setup error:", error.message);
      // Handle or display error messages as needed
    }

    return Promise.reject(error);
  }
);
export default protectedInstance;
