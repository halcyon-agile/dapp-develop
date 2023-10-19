import request from "../lib/request";
import { AxiosError } from "axios";
import { UserData } from "@/types";

const getUser = async (): Promise<UserData | AxiosError | any> => {
  try {
    const userResponse = await request.get("/api/me");
    return userResponse.data as UserData;
  } catch (error: AxiosError | any) {
    throw error;
  }
};

export default getUser;
