"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClientsList from "@/components/ui/clients";

const queryClient = new QueryClient();

export default function DashboardRoute() {
  return (
    <QueryClientProvider client={queryClient}>
      <ClientsList />
    </QueryClientProvider>
  );
}
