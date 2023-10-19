import request from "../../lib/request";
import { AxiosError } from "axios";
import { Consultations } from "@/types";

const getConsultations = async (): Promise<
  Consultations[] | AxiosError | any
> => {
  try {
    const consultations = await request.get("/api/consultations");
    return consultations.data;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export default getConsultations;
