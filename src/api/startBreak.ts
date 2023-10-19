import request from "../lib/request";
import { AxiosError } from "axios";
import { Breaks, BreakForm } from "@/types";

const startBreak = async (
  breakForm: BreakForm
): Promise<Breaks | AxiosError | any> => {
  try {
    const response = await request.post(`api/break/start`, {
      reason: breakForm.reason,
      minutes: Number(60 / breakForm.hours > 0 ? Number(breakForm.hours) : 0 + breakForm.minutes > 0 ? Number(breakForm.minutes) : 0),
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default startBreak;
