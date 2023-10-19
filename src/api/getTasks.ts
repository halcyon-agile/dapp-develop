import request from "../lib/request";
import { AxiosError } from "axios";
import { Task } from "../types";

const getTasks = async (filter: number): Promise<Task[] | AxiosError | any> => {
  try {
    const tasks = await request.get(`/api/tasks?projectId=${filter? filter: ''}`);
    console.log('getTask request', tasks)
    return tasks.data;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export default getTasks;
