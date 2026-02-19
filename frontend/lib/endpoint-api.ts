"use server";

import { Client, User } from "@/types/typeClients";
import { strapiJson } from "./api";

export async function fetchClients(): Promise<{ data: Client[] }> {
  try {
    const response = await strapiJson<{
      data: Client[];
      meta: Record<string, unknown>;
    }>("/api/clientes");

    return { data: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
}

export async function fetchClientById(
  documentId: string,
): Promise<{ data: Client }> {
  try {
    const response = await strapiJson<{
      data: Client;
      meta: Record<string, unknown>;
    }>(`/api/clientes/${documentId}`);

    return { data: response.data };
  } catch (error) {
    console.error("Error fetching client by ID:", error);
    throw new Error("Error fetching client by ID");
  }
}

export async function fetchUser() {
  try {
    const getUser = await strapiJson<User>("/api/users/me");

    return { fullname: getUser.fullname, lastname: getUser.lastname };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { fullname: "", lastname: "" };
  }
}
