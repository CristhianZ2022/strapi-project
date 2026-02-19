import { useQuery } from "@tanstack/react-query";
import { fetchClientById } from "@/lib/endpoint-api";

export function useClientById(documentId: string) {
  return useQuery({
    queryKey: ["clientById", documentId],
    queryFn: () => fetchClientById(documentId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!documentId,
    select: (response) => response.data,
  });
}
