import { fetchPlans } from "@/lib/endpoint-api";
import { useQuery } from "@tanstack/react-query";

export function usePlans(enabled: boolean = true) {
  return useQuery({
    queryKey: ["plans"],
    queryFn: fetchPlans,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
}