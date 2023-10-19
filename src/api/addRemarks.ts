import request from "../lib/request";
import { AxiosError } from "axios";

const addRemarks = async (id: number, remark: string): Promise<AxiosError | any> => {
  try {
    const formData = new FormData();
    formData.append("remark", remark)
    const tasks = await request.post(`/api/tasks/${id}/remark`, formData);
    return tasks;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default addRemarks;
