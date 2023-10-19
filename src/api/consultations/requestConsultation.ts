import request from "../../lib/request";
import { AxiosError } from "axios";
import { RequestConsultation } from "@/types";

const requestConsultation = async (
  id: number,
  started_at: string,
  duration: string,
  type: "fixed" | "flexible",
  members: number[]
): Promise<RequestConsultation[] | AxiosError | any> => {
  try {
    const formData = new FormData();
    formData.append("started_at", started_at);
    formData.append("duration", duration);
    formData.append("type", type);
    members.map((item: any, index: number) => {
      formData.append(`members[${index}]`, item.id);
    });

    const consultations = await request.post(
      `/api/tasks/${id}/request-consultation`,
      formData
    );
    // console.log('response', consultations);
    return consultations.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default requestConsultation;
