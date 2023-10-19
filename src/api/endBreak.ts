import request from "../lib/request";
import { AxiosError } from "axios";
import { Breaks } from "../types";

const endBreak = async (): Promise<Breaks | AxiosError | any> => {
  try {
    const response = await request.post(`api/break/end`);

    return response.data;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

export default endBreak;
