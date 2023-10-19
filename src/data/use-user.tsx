import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { UserData } from "@/types";
import request from "../lib/request";

export default function useUser(): UseQueryResult<UserData> {
  return useQuery<UserData>({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await request.get("/api/me");
      return data;
    },
    refetchInterval: 5000,
  });
}
