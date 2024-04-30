import { ClientSchema } from "../types";
import { TypeClient } from "../types/clientSchema";

export const submitEditClient = async (data: TypeClient, id: number) => {
  try {
    ClientSchema.parse(data);
    const response = await fetch(`/api/clients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Validation error:", error);
  }

  return { id };
};

export const submitAddClient = async (data: unknown) => {
  try {
    ClientSchema.parse(data);
    const response = await fetch("/api/clients/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Validation error:", error);
  }
};

export const fetchClient = async (id: string | undefined) => {
  if (!id) {
    throw new Error("Client ID is undefined");
  }
  const response = await fetch(`/api/clients/${id}`);
  return (await response.json()) as TypeClient;
};

export const fetchClients = async (): Promise<TypeClient[]> => {
  const response = await fetch("/api/clients");
  return (await response.json()) as TypeClient[];
};

export const deleteClient = async (id: number): Promise<void> => {
  const response = await fetch(`/api/clients/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};
