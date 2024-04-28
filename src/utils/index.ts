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
      ddd: "21",
      telefone: "91234-5678",
    },
    {
      id: 2,
      tipo: "PJ",
      nomeFantasia: "Empresa Silva",
      razaoSocial: "Silva Industria e Comercio Ltda",
      cnpj: "12.345.678/0001-90",
      email: "contato@empresasilva.com.br",
      ddd: "11",
      telefone: "91234-5678",
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

export function validateCPF(cpf: string): boolean {
  let sum, rest;
  sum = 0;
  cpf = cpf.replace(/\D/g, "");

  if (cpf === "00000000000") return false;

  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

export function validateCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj === "") return false;

  if (cnpj.length !== 14) return false;

  // Eliminate known invalid CNPJs
  if (
    cnpj === "00000000000000" ||
    cnpj === "11111111111111" ||
    cnpj === "22222222222222" ||
    cnpj === "33333333333333" ||
    cnpj === "44444444444444" ||
    cnpj === "55555555555555" ||
    cnpj === "66666666666666" ||
    cnpj === "77777777777777" ||
    cnpj === "88888888888888" ||
    cnpj === "99999999999999"
  )
    return false;

  // Validate DVs
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  const digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== Number(digits.charAt(0))) return false;

  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== Number(digits.charAt(1))) return false;

  return true;
}
