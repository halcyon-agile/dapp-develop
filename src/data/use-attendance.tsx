import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Attendance } from "@/types";
import request from "../lib/request";

export default function useAttendance(): UseQueryResult<Attendance> {
  return useQuery<Attendance>({
    queryKey: ["attendance"],
    queryFn: async () => {
      const { data } = await request.get("/api/attendance");
      return data;
    },
  });
}
