import request from "../lib/request";
import { AxiosError } from "axios";
import moment from "moment";
import { Scrum } from "../types";

const getScrums = async (): Promise<Scrum[] | AxiosError | any> => {
  try {
    let dayOfTheWeek = moment().utc().format("dddd");
    const scrums = await request.get(
      `/api/scrums?day=${dayOfTheWeek.toLowerCase()}`
    );
    return scrums.data;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export default getScrums;
