import request from "../../lib/request";
import { AxiosError } from "axios";

const leaveConsultation = async (id: number): Promise<AxiosError | any> => {
  try {
    const consultations = await request.post(`/api/consultations/${id}/leave`);
    return consultations.data;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export default leaveConsultation;
