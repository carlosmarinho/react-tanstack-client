import { z } from "zod";

const Tipo = z.nativeEnum({
  PF: "PF",
  PJ: "PJ",
});

const BaseClient = z.object({
  id: z.number().optional(),
  tipo: Tipo,
  email: z.string(),
  ddd: z.string().regex(/^[0-9]{2}$/),
  telefone: z.string().regex(/^[9][0-9]{7}$/),
});

export const PFClient = BaseClient.merge(
  z.object({
    tipo: z.literal("PF"),
    nome: z.string(),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
  })
);

export const PJClient = BaseClient.merge(
  z.object({
    tipo: z.literal("PJ"),
    nomeFantasia: z.string(),
    razaoSocial: z.string(),
    cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/),
  })
);

export const ClientSchema = z.union([PFClient, PJClient]);

export type TypeClient = z.infer<typeof ClientSchema>;
