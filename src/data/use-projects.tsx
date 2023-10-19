import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Project } from "@/types";
import request from "../lib/request";

export default function useTaskTypes(): UseQueryResult<Project[]> {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await request.get("/api/projects");
      return data;
    },
    retry: false,
  });
}
