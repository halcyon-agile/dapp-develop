import request from "../../lib/request";
import { AxiosError } from "axios";

const joinConsultation = async (id: number): Promise<AxiosError | any> => {
  try {
    const consultations = await request.post(`/api/consultations/${id}/join`);
    return consultations;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export default joinConsultation;
