import { TypeClient } from "../types/clientSchema";

export class ClientMap extends Map {
  constructor() {
    super();

    // Load clients from sessionStorage on initialization
    const clients = sessionStorage.getItem("clients");
    if (clients) {
      const parsedClients = JSON.parse(clients);
      parsedClients.forEach((client: TypeClient) =>
        this.set(String(client.id), client)
      );
    }

    console.log("\n\n***\n clients no map: ", clients, "\n***\n");
  }

  set(key: string, value: TypeClient) {
    const result = super.set(key, value);

    // Save clients to sessionStorage whenever a new client is added
    sessionStorage.setItem(
      "clients",
      JSON.stringify(Array.from(this.values()))
    );

    return result;
  }

  delete(key: string) {
    const result = super.delete(key);

    // Save clients to sessionStorage whenever a client is deleted
    sessionStorage.setItem(
      "clients",
      JSON.stringify(Array.from(this.values()))
    );

    return result;
  }
}
