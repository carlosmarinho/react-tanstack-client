import { FC } from "react";
import { FieldError } from "react-hook-form";
import { FormInput } from "../../customForm/formInput";
import { ClientFormProps } from "./PersonClientForm";
import { CLIENT_STRINGS } from "../strings";

export const CompanyClientForm: FC<ClientFormProps> = ({ errors }) => (
  <>
    <FormInput
      label={CLIENT_STRINGS.CNPJ}
      error={!!errors.cnpj}
      helperText={(errors.cnpj as FieldError)?.message}
      maxLength="14"
    />
    <FormInput
      label={CLIENT_STRINGS.NOME_FANTASIA}
      error={!!errors.nomeFantasia}
      helperText={(errors.nomeFantasia as FieldError)?.message}
    />
    <FormInput
      label={CLIENT_STRINGS.RAZAO_SOCIAL}
      error={!!errors.razaoSocial}
      helperText={(errors.razaoSocial as FieldError)?.message}
    />
  </>
);
