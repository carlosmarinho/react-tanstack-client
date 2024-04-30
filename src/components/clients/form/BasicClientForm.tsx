import { FC } from "react";
import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput } from "../../customForm/formInput";
import { Box, FormHelperText } from "@mui/material";

import { FieldValues } from "react-hook-form";

export interface ClientFormProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export const BasicClientForm: FC<ClientFormProps> = ({ errors }) => (
  <>
    <FormInput
      label="Email"
      error={!!errors.email}
      helperText={errors.email && "Este campo é obrigatório"}
      fullWidth
    />
    <Box marginBottom={2}>
      <FormInput
        sx={{ width: "18%", marginRight: "10px" }}
        label="DDD"
        error={!!errors.ddd}
        helperText={(errors.ddd as FieldError)?.message}
        inputProps={{ maxLength: 2 }}
        maxLength="2"
        noBox={true}
      />
      <FormInput
        sx={{ width: "80%" }}
        label="Telefone"
        error={!!errors.telefone}
        helperText={(errors.telefone as FieldError)?.message}
        maxLength="9"
        noBox={true}
      />
      {!errors.telefone && (
        <FormHelperText>DDD e Telefone aceita apenas números</FormHelperText>
      )}
    </Box>
  </>
);
