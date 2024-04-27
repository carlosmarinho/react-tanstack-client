import { z } from "zod";

const Tipo = z.nativeEnum({
  PF: "PF",
  PJ: "PJ",
});

const BaseClient = z.object({
  id: z.number().optional(),
  tipo: Tipo,
  email: z.string(),
  telefone: z.string(),
});

export const PFClient = BaseClient.merge(
  z.object({
    tipo: z.literal("PF"),
    nome: z.string(),
    cpf: z.string(),
  })
);

export const PJClient = BaseClient.merge(
  z.object({
    tipo: z.literal("PJ"),
    nomeFantasia: z.string(),
    razaoSocial: z.string(),
    cnpj: z.string(),
  })
);

export const ClientSchema = z.union([PFClient, PJClient]);

export type TypeClient = z.infer<typeof ClientSchema>;
