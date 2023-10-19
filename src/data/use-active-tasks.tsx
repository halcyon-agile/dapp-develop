import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TaskTime } from "@/types";
import request from "../lib/request";

export default function useActiveTasks(): UseQueryResult<TaskTime[]> {
  return useQuery<TaskTime[]>({
    queryKey: ["activeTasks"],
    queryFn: async () => {
      const { data } = await request.get("/api/active-tasks");
      return data;
    },
    refetchInterval: 30000,
  });
}
