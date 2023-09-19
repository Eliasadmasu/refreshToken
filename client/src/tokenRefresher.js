import Cookies from "js-cookie";
import protectedInstance from "./pages/Protected/axiosConfig";

export const newtokenrefresher = async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");
    const refreshTokenRes = await protectedInstance.post("/auth/refresh", {
      refreshToken,
    });
    const newAccessToken = refreshTokenRes.data.accessToken;
    Cookies.set("accessToken", newAccessToken);
  } catch (error) {
    console.error("Token refresh failed:", error);
  }
};
