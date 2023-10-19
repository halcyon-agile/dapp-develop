import { AxiosError } from "axios";
import request from "../../lib/request";

const suddenConsultation = async (
  id: any,
  started_at: string,
  ended_at: string,
): Promise<AxiosError | any> => {
  try {
    const formData = new FormData();
    formData.append("task_id", id);
    formData.append("started_at", started_at);
    formData.append("time_started_at", started_at);
    formData.append("ended_at", ended_at);
    formData.append("time_ended_at", ended_at);

    const consultations = await request.post(
      `/api/sudden-consultation`,
      formData
    );
    return consultations.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default suddenConsultation;
