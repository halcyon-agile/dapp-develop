import request from "../lib/request";
import { AxiosError } from "axios";
import moment from "moment";

export interface RedDot {
  scrums: boolean;
  consultations: boolean;
}

const getRedDots = async (): Promise<RedDot[] | AxiosError | any> => {
  try {
    let dayOfTheWeek = moment().utc().format('dddd')
    const redDot = await request.get(`/api/red-dots?day=${dayOfTheWeek.toLowerCase()}`);
    return redDot.data;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export default getRedDots;
