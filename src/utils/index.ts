import { ClientMap } from "../mocks/clientsMap";
import { ClientSchema, TypeClient } from "../types/clientSchema";

export const clientMap = new ClientMap();

export function getDefaultClients(): TypeClient[] {
  return [
    {
      id: 1,
      tipo: "PF",
      nome: "Carlos Marinho",
      cpf: "123.456.789-00",
      email: "carlos@example.com",
      telefone: "(11) 91234-5678",
    },
    {
      id: 2,
      tipo: "PJ",
      nomeFantasia: "Empresa Silva",
      razaoSocial: "Silva Industria e Comercio Ltda",
      cnpj: "12.345.678/0001-90",
      email: "contato@empresasilva.com.br",
      telefone: "(11) 91234-5678",
    },
  ];
}

export function initializeSessionStorage(): TypeClient[] {
  const clients = getDefaultClients();

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

  sessionStorage.setItem("clients", JSON.stringify(clients));

  return clients;
}

export function getClientsFromSessionStorage(): TypeClient[] {
  const storage = sessionStorage.getItem("clients");
  let clients: TypeClient[] = [];

  console.log("\n\n***\n storage: ", storage, "\n***\n");

  if (storage) {
    clients = JSON.parse(storage);
    console.log(
      "\n\n***\n it should return clients from here: ",
      clients,
      "\n***\n"
    );
  } else {
    clients = initializeSessionStorage();
  }

  return clients;
}

export function clientMapHasId(id: string) {
  if (!clientMap.has(id)) {
    console.error("Client not found:", id);
    return false;
  }
  return true;
}
