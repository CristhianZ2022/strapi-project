"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ClientContextType {
  selectedClientId: string | null;
  setSelectedClientId: (id: string | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: ReactNode }) {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("cliente");

  return (
    <ClientContext.Provider
      value={{
        selectedClientId,
        setSelectedClientId,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useClientContext() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error("useClientContext must be used within a ClientProvider");
  }
  return context;
}