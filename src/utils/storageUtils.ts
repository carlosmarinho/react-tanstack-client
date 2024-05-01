import { mockClients } from "../mocks/clients";
import { ClientMap } from "../mocks/clientsMap";
import { ClientSchema, TypeClient } from "../types/clientSchema";

export const clientMap = new ClientMap();

function mockClientsWithNewIds(clientsStorage: TypeClient[]): TypeClient[] {
  let newId = mockClients.length + 1;
  return [
    ...mockClients,
    ...clientsStorage.map((client: TypeClient) => ({ ...client, id: newId++ })),
  ];
}

export function getDefaultClients(): TypeClient[] {
  const storage = sessionStorage.getItem("clients");

  if (!storage) {
    return mockClients;
  }

  return mockClientsWithNewIds(JSON.parse(storage));
}

export function gnerateFakeClientsToSessionStorage(): TypeClient[] {
  const clients = getDefaultClients();

  // Validate clients and checking if our backend data is correct
  clients.forEach((client) => {
    try {
      ClientSchema.parse(client);
      clientMap.set(client.id!.toString(), client);
    } catch (error) {
      const zodError = error as Error;
      console.log(`Vaaalidation error for client ${client.id}:`, zodError);
    }
  });

  sessionStorage.setItem("clients", JSON.stringify(clients));

  return clients;
}

export function getClientsFromSessionStorage(): TypeClient[] {
  const storage = sessionStorage.getItem("clients");
  let clients: TypeClient[] = [];

  if (storage) {
    clients = JSON.parse(storage);
  }

  return clients;
}

export function clientMapHasId(id: string) {
  if (!clientMap.has(id)) {
    console.log("Client not found:", id);
    return false;
  }
  return true;
}
