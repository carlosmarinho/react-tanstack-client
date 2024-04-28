import { TypeClient } from "../types/clientSchema";

export const mockClients: TypeClient[] = [
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
