import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("/api/getclients", () => {
    console.log("\n\n***\n era p ter retornado o json: ", "\n***\n");
    return HttpResponse.json([
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
    ]);
  }),
];

// export const handlers = [
//   rest.get("/api/getClients", (_request, response, context) => {
//     return response(
//       context.status(200),
//       context.json([
//         { id: 1, name: "Carlos Marinho" },
//         { id: 2, name: "Eloah Silva" },
//       ])
//     );
//   }),
// ];
