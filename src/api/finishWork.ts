import request from "../lib/request";
import { AxiosError } from "axios";
import { Attendance } from "../types";

const finishWork = async (): Promise<Attendance | AxiosError | any> => {
  try {
    const attendance = await request.post(`api/finish-work`, {
      password: "secret",
    });

    delete request.defaults.headers.common["Authorization"];

    return attendance.data;
  } catch (error) {
    throw error;
  }
};

export default finishWork;
