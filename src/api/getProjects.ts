import request from "../lib/request";
import { AxiosError } from "axios";
import { Project } from "../types";

const getProjects = async (): Promise<Project[] | AxiosError | any> => {
  try {
    const projects = await request.get("/api/projects");
    return projects.data;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export default getProjects;
