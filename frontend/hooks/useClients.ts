import { fetchClients } from "@/lib/endpoint-api";
import { useQuery } from "@tanstack/react-query";

export function useClients(enabled: boolean = true) {
  return useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled,
  });
}
