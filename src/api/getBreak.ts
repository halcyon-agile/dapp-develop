import request from "../lib/request";
import { AxiosError } from "axios";
import { Breaks } from "../types";

const getBreak = async (): Promise<Breaks | AxiosError | any> => {
  try {
    const response = await request.get(`api/break`);

    return response.data;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

export default getBreak;
