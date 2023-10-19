import request from "../lib/request";
import { AxiosError } from "axios";
import { Task } from "@/types";

const updateCurrentEstimate = async ({
  taskId,
  estimate,
  requiredByTime,
}: {
  taskId: number;
  estimate: number;
  requiredByTime?: boolean;
}): Promise<Task | AxiosError | any> => {
  const formData = new FormData()
  formData.append("estimate", estimate.toString())
  if (requiredByTime) {
    formData.append("requireByTime", "true")
  }
  const response = await request.post(`api/tasks/${taskId}/update-estimate`, formData);
  return response;
};

export default updateCurrentEstimate;
