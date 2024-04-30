import { FC } from "react";
import { Controller, FieldError } from "react-hook-form";
import { FormInput } from "../../customForm/formInput";
import { Box, FormHelperText } from "@mui/material";

import { CLIENT_STRINGS } from "../strings";
import { ClientFormProps } from "./BasicClientForm";

export const PersonClientForm: FC<ClientFormProps> = ({ errors, control }) => (
  <>
    <Box marginBottom={2}>
      <Controller
        name="nome"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            label={CLIENT_STRINGS.NOME}
            error={!!errors.nome}
            helperText={(errors.nome as FieldError)?.message}
            field={field}
          />
        )}
      />
    </Box>
    {/**
     * @todo add mask to this field maybe using react-input-mask to
     * allow separation between numbers
     */}
    <Controller
      name="cpf"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormInput
          label={CLIENT_STRINGS.CPF}
          error={!!errors.cpf}
          helperText={(errors.cpf as FieldError)?.message}
          maxLength="11"
          field={field}
        >
          {!errors.cpf && (
            <FormHelperText>{CLIENT_STRINGS.CPF_HELP}</FormHelperText>
          )}
        </FormInput>
      )}
    />
  </>
);
