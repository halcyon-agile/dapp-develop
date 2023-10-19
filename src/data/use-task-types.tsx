import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TaskType } from "@/types";
import request from "../lib/request";

export default function useTaskTypes(): UseQueryResult<TaskType[]> {
  return useQuery<TaskType[]>({
    queryKey: ["task-types"],
    queryFn: async () => {
      const { data } = await request.get("/api/task-types");
      return data;
    },
    retry: false,
  });
}
