import { HttpResponse, http } from "msw";
import { ClientSchema } from "../types";
import { ClientMap } from "./clientsMap";
import { TypeClient } from "../types/clientSchema";
import { getDefaultClients } from "./defaultClients";

const clientMap = new ClientMap();

export const handlers = [
  http.get("/api/clients", () => {
    const storage = sessionStorage.getItem("clients");
    let clients: TypeClient[] = [];

    if (storage) {
      clients = JSON.parse(storage);
    } else {
      clients = getDefaultClients();

      // Validate clients and checking if our backend data is correct
      clients.forEach((client) => {
        try {
          ClientSchema.parse(client);
          clientMap.set(client.id!.toString(), client);
        } catch (error) {
          const zodError = error as Error;
          console.error(`Validation error for client ${client.id}:`, zodError);
        }
      });
    }
    return HttpResponse.json(clients);
  }),

  http.post("/api/clients", async ({ request }) => {
    const client = (await request.json()) as TypeClient;
    try {
      ClientSchema.parse(client);
      clientMap.set((clientMap.size + 1).toString(), {
        id: clientMap.size + 1,
        ...client,
      });
      sessionStorage.setItem(
        "clients",
        JSON.stringify(Array.from(clientMap.values()))
      );
    } catch (error) {
      console.error("Invalid client:", error);
    }
    return new HttpResponse(null, { status: 201 });
  }),

  http.put("/api/clients/:id", async ({ request, params }) => {
    const { id } = params;
    if (typeof id !== "string") {
      console.error("Invalid id:", id);
      return new HttpResponse(null, { status: 400 });
    }

    const client = (await request.json()) as TypeClient;
    try {
      ClientSchema.parse(client);
      clientMap.set(id, client);
      sessionStorage.setItem(
        "clients",
        JSON.stringify(Array.from(clientMap.values()))
      );
    } catch (error) {
      console.error("Invalid client:", error);
    }
    return new HttpResponse(null, { status: 204 });
  }),

  http.delete("/api/clients/:id", async ({ params }) => {
    const { id } = params;
    if (typeof id !== "string") {
      console.error("Invalid id:", id);
      return new HttpResponse(null, { status: 400 });
    }

    clientMap.delete(id);
    sessionStorage.setItem(
      "clients",
      JSON.stringify(Array.from(clientMap.values()))
    );
    return new HttpResponse(null, { status: 202 });
  }),
];
