import request from "../lib/request";
import { AxiosError } from "axios";
import { UserData } from "@/types";

const loginUser = async (
  email: string,
  password: string
): Promise<UserData | AxiosError | any> => {
  try {
    const loginResponse = await request.post("/api/login", {
      email,
      password,
      device_name: "desktop-app",
    });
    localStorage.setItem("token", loginResponse.data.token);
    request.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${loginResponse.data.token}`;
    const userResponse = await request.get("/api/me");
    return userResponse.data as UserData;
  } catch (error: AxiosError | any) {
    throw error;
  }
};

export default loginUser;
