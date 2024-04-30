import { FC } from "react";
import { FieldError, FieldErrors } from "react-hook-form";
import { FormInput } from "../../customForm/formInput";
import { Box, FormHelperText } from "@mui/material";

import { FieldValues } from "react-hook-form";
import { CLIENT_STRINGS } from "../strings";

export interface ClientFormProps {
  errors: FieldErrors<FieldValues>;
}

export const PersonClientForm: FC<ClientFormProps> = ({ errors }) => (
  <>
    <Box marginBottom={2}>
      <FormInput
        label={CLIENT_STRINGS.NOME}
        error={!!errors.nome}
        helperText={(errors.nome as FieldError)?.message}
      />
    </Box>
    {/**
     * @todo add mask to this field maybe using react-input-mask to
     * allow separation between numbers
     */}
    <FormInput
      label={CLIENT_STRINGS.CPF}
      error={!!errors.cpf}
      helperText={(errors.cpf as FieldError)?.message}
      maxLength="11"
    >
      {!errors.cpf && (
        <FormHelperText>{CLIENT_STRINGS.CPF_HELP}</FormHelperText>
      )}
    </FormInput>
  </>
);
