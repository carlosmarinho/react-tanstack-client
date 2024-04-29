import { z } from "zod";
import { validateCNPJ, validateCPF } from "../utils";

const Tipo = z.nativeEnum({
  PF: "PF",
  PJ: "PJ",
});

const BaseClient = z.object({
  id: z.number().optional(),
  tipo: Tipo,
  email: z.string().min(5, { message: "Campo email é obirgatório!" }),
  ddd: z
    .string()
    .min(2, { message: "Campo DDD é obirgatório!" })
    .regex(/^[0-9]{2}$/),
  telefone: z
    .string()
    .min(9, { message: "Campo telefone é obirgatório!" })
    .regex(/^[9][0-9]{8}$/),
});

export const PFClient = BaseClient.merge(
  z.object({
    tipo: z.literal("PF"),
    nome: z.string().min(1, { message: "Nome é obrigatório" }),
    cpf: z
      .string()
      .min(11, { message: "CPF é obrigatório e deve ter 11 Caracteres" })
      .refine(validateCPF, {
        message: "CPF Inválido (somente números)",
      }),
  })
);

export const PJClient = BaseClient.merge(
  z.object({
    tipo: z.literal("PJ"),
    nomeFantasia: z.string().min(1, { message: "Nome Fantasia é obrigatório" }),
    razaoSocial: z.string().min(1, { message: "Razão Social é obrigatório" }),
    cnpj: z.string().refine(validateCNPJ, {
      message: "CNPJ Inválido",
    }),
  })
);

export const ClientSchema = z.union([PFClient, PJClient]);

export type TypeClient = z.infer<typeof ClientSchema>;
