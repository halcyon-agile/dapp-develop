import request from "../lib/request";
import { AxiosError } from "axios";

const getUsers = async (): Promise<[] | AxiosError | any> => {
  try {
    const users = await request.get("/api/users");
    return users.data;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export default getUsers;
