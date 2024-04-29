import { FC } from "react";
import { FieldError } from "react-hook-form";
import { FormInput } from "../../customForm/formInput";
import { ClientFormProps } from "./PersonClientForm";
import { CLIENT_STRINGS } from "../strings";

export const CompanyClientForm: FC<ClientFormProps> = ({
  register,
  errors,
}) => (
  <>
    <FormInput
      label={CLIENT_STRINGS.CNPJ}
      register={register("cnpj", { required: true })}
      error={!!errors.cnpj}
      helperText={(errors.cnpj as FieldError)?.message}
    />
    <FormInput
      label={CLIENT_STRINGS.NOME_FANTASIA}
      register={register("nomeFantasia", { required: true })}
      error={!!errors.nomeFantasia}
      helperText={(errors.nomeFantasia as FieldError)?.message}
    />
    <FormInput
      label={CLIENT_STRINGS.RAZAO_SOCIAL}
      register={register("razaoSocial", { required: true })}
      error={!!errors.razaoSocial}
      helperText={(errors.razaoSocial as FieldError)?.message}
    />
  </>
);
