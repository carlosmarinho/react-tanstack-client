import { HttpResponse, http } from "msw";
import { ClientSchema } from "../types";
import { TypeClient } from "../types/clientSchema";
import {
  clientMap,
  clientMapHasId,
  getClientsFromSessionStorage,
} from "../utils/storageUtils";

export const handlers = [
  http.get("/api/clients", () => {
    const clients = getClientsFromSessionStorage();
    return HttpResponse.json(clients);
  }),

  http.get("/api/clients/:id", ({ params }) => {
    const { id } = params;

    // I need to add this validation cause id in params can also be an array and typescrpt is complaning
    if (typeof id !== "string") {
      console.error("Invalid id:", id);
      return new HttpResponse("Invalid ID", { status: 400 });
    }

    if (!clientMapHasId(id)) {
      return new HttpResponse("Client not found", { status: 404 });
    }

    const client = clientMap.get(id);
    return HttpResponse.json(client);
  }),

  http.post("/api/clients", async ({ request }) => {
    const client = (await request.json()) as TypeClient;
    try {
      ClientSchema.parse(client);
      clientMap.set((clientMap.size + 1).toString(), {
        id: clientMap.size + 1,
        ...client,
      });
    } catch (error) {
      console.error("Invalid client:", error);
      /**@todo returning this is not working, try to find possible solution */
      // return new HttpResponse("Invalid client data", { status: 400 });
    }
    return new HttpResponse(null, { status: 201 });
  }),

  http.put("/api/clients/:id", async ({ request, params }) => {
    const { id } = params;

    // I need to add this validation cause id in params can also be an array and typescrpt is complaning
    if (typeof id !== "string") {
      console.error("Invalid id:", id);
      return new HttpResponse("Invalid ID", { status: 400 });
    }

    if (!clientMapHasId(id)) {
      return new HttpResponse("Client not found", { status: 404 });
    }

    const client = (await request.json()) as TypeClient;
    try {
      ClientSchema.parse(client);
      clientMap.set(id, client);
    } catch (error) {
      console.error("Invalid client:", error);
      /**@todo returning this is not working, try to find possible solution, for this reason I'll keep only the console.log */
      // return new HttpResponse('Invalid client data', { status: 400 });
    }
    return new HttpResponse(null, { status: 204 });
  }),

  http.delete("/api/clients/:id", ({ params }) => {
    const { id } = params;
    // I need to add this validation cause id in params can also be an array and typescrpt is complaning
    if (typeof id !== "string") {
      console.error("Invalid id:", id);
      return new HttpResponse("Invalid ID", { status: 400 });
    }

    if (!clientMapHasId(id)) {
      return new HttpResponse("Client not found", { status: 404 });
    }

    clientMap.delete(id);
    return new HttpResponse(null, { status: 204 });
  }),
];
