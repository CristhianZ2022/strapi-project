import HeaderControl from "@/components/pages/header-control";
import { fetchUser } from "@/lib/endpoint-api";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Panel de control para la gestión de clientes.",
  robots: {
    index: false,
    follow: false,
  },
};

import Providers from "@/components/providers/query-provider";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  let user = null;

  try {
    user = await fetchUser();
  } catch (err) {
    console.error("Error fetching user in dashboard layout:", err);
  }

  return (
    <Providers>
        <HeaderControl initialUser={user} />
        <main>{children}</main>
    </Providers>
  );
}
