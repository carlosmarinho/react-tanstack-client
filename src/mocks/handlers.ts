import { HttpResponse, http } from "msw";
import { ClientSchema } from "../types";

export const handlers = [
  http.get("/api/clients", () => {
    const clients = [
      {
        id: 1,
        tipo: "PF",
        nome: "Carlos Marinho",
        cpf: "123.456.789-00",
        nomeFantasia: null,
        razaoSocial: null,
        cnpj: null,
        email: "carlos@example.com",
        telefone: "(11) 91234-5678",
      },
      {
        id: 2,
        tipo: "PJ",
        nome: null,
        cpf: null,
        nomeFantasia: "Empresa Silva",
        razaoSocial: "Silva Industria e Comercio Ltda",
        cnpj: "12.345.678/0001-90",
        email: "contato@empresasilva.com.br",
        telefone: "(11) 91234-5678",
      },
    ];

    // Validate clients and checking if our backend data is correct
    clients.forEach((client) => {
      try {
        ClientSchema.parse(client);
      } catch (error) {
        const zodError = error as Error;
        console.error(`Validation error for client ${client.id}:`, zodError);
      }
    });

    return HttpResponse.json(clients);
  }),
];
