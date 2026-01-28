import { fetchClients } from '@/lib/api';
import { useQuery } from "@tanstack/react-query";

export function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}