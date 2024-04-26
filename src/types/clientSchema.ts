import { z } from "zod";

export const PFClient = z.object({
  id: z.number(),
  tipo: z.literal("PF"),
  nome: z.string(),
  cpf: z.string(),
  nomeFantasia: z.null(),
  razaoSocial: z.null(),
  cnpj: z.null(),
  email: z.string(),
  telefone: z.string(),
});

export const PJClient = z.object({
  id: z.number(),
  tipo: z.literal("PJ"),
  nome: z.null(),
  cpf: z.null(),
  nomeFantasia: z.string(),
  razaoSocial: z.string(),
  cnpj: z.string(),
  email: z.string(),
  telefone: z.string(),
});

export const ClientSchema = z.union([PFClient, PJClient]);
