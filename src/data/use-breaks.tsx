import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { BreaksData } from "@/types";
import request from "../lib/request";

export default function useBreaks(): UseQueryResult<BreaksData> {
  return useQuery<BreaksData>({
    queryKey: ["breaks"],
    queryFn: async () => {
      const { data } = await request.get("/api/breaks");
      return data;
    },
  });
}
