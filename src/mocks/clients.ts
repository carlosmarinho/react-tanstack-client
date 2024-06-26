import { TypeClient, TypePF, TypePJ } from "../types/clientSchema";

export const clientPF: TypePF = {
  tipo: "PF",
  email: "testpf@example.com",
  ddd: "11",
  telefone: "955516234",
  nome: "Test Person",
  cpf: "92511930021",
};

export const clientPJ: TypePJ = {
  tipo: "PJ",
  email: "testpj@example.com",
  ddd: "11",
  telefone: "922251234",
  nomeFantasia: "Test Company",
  razaoSocial: "Test Company Ltda",
  cnpj: "85359859000144",
};

export const mockClients: TypeClient[] = [
  {
    id: 1,
    tipo: "PF",
    nome: "Carlos Marinho",
    cpf: "26526773060",
    email: "carlos@example.com",
    ddd: "21",
    telefone: "912345678",
  },
  {
    id: 2,
    tipo: "PJ",
    nomeFantasia: "Empresa Silva",
    razaoSocial: "Silva Industria e Comercio Ltda",
    cnpj: "64890220000110",
    email: "contato@empresasilva.com.br",
    ddd: "11",
    telefone: "912345678",
  },
  {
    id: 3,
    tipo: "PF",
    nome: "Maria Oliveira",
    cpf: "98765432100",
    email: "maria@example.com",
    ddd: "19",
    telefone: "987654321",
  },
  {
    id: 4,
    tipo: "PJ",
    nomeFantasia: "Empresa Santos",
    razaoSocial: "Santos Tecnologia e Serviços Ltda",
    cnpj: "82603507000102",
    email: "contato@empresasantos.com.br",
    ddd: "31",
    telefone: "987654321",
  },
  {
    id: 5,
    tipo: "PF",
    nome: "João Pereira",
    cpf: "25411332001",
    email: "joao@example.com",
    ddd: "22",
    telefone: "976543210",
  },
];
