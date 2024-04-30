import { FC } from "react";
import { Controller, FieldError } from "react-hook-form";
import { FormInput } from "../../customForm/formInput";
import { CLIENT_STRINGS } from "../strings";
import { ClientFormProps } from "./BasicClientForm";

export const CompanyClientForm: FC<ClientFormProps> = ({ errors, control }) => (
  <>
    <Controller
      name="cnpj"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormInput
          label={CLIENT_STRINGS.CNPJ}
          error={!!errors.cnpj}
          helperText={(errors.cnpj as FieldError)?.message}
          maxLength="14"
          field={field}
        />
      )}
    />
    <Controller
      name="nomeFantasia"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormInput
          label={CLIENT_STRINGS.NOME_FANTASIA}
          error={!!errors.nomeFantasia}
          helperText={(errors.nomeFantasia as FieldError)?.message}
          field={field}
        />
      )}
    />
    <Controller
      name="razaoSocial"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormInput
          label={CLIENT_STRINGS.RAZAO_SOCIAL}
          error={!!errors.razaoSocial}
          helperText={(errors.razaoSocial as FieldError)?.message}
          field={field}
        />
      )}
    />
  </>
);
