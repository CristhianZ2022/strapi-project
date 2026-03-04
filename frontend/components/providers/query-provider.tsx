"use client";

import { ClientProvider } from "@/contexts/client-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const [clientById] = useState(() => new QueryClient());
  const [user] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={clientById} context={user}>
      <ClientProvider>{children}</ClientProvider>
    </QueryClientProvider>
  );
}
