import { AxiosError } from "axios";
import request from "../../lib/request";

const createSuddenConsultation = async (
  project_id: any,
  task_type_id: any,
  name: string,
  description: string,
  started_at: string,
  ended_at: string,
  time_started_at: string,
  time_ended_at: string,
): Promise<AxiosError | any> => {
  try {
    const formData = new FormData();
    formData.append("project_id", project_id);
    formData.append("task_type_id", task_type_id);
    formData.append("name", name);
    formData.append("label", description);
    formData.append("estimate", "0");
    formData.append("remark", "");
    formData.append("started_at", started_at);
    formData.append("time_started_at", time_started_at);
    formData.append("ended_at", ended_at);
    formData.append("time_ended_at", time_ended_at);

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

export default createSuddenConsultation;
