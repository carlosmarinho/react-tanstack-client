import { FC } from "react";
import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput } from "../../customForm/formInput";
import { Box, FormHelperText } from "@mui/material";

import { FieldValues } from "react-hook-form";

export interface ClientFormProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export const BasicClientForm: FC<ClientFormProps> = ({ register, errors }) => (
  <>
    <FormInput
      label="Email"
      register={register("email", { required: true })}
      error={!!errors.email}
      helperText={errors.email && "Este campo é obrigatório"}
      fullWidth
    />
    <Box marginBottom={2}>
      <FormInput
        sx={{ width: "18%", marginRight: "10px" }}
        label="DDD"
        register={register("ddd", { required: true, pattern: /^[0-9]{2}$/ })}
        error={!!errors.ddd}
        helperText={(errors.ddd as FieldError)?.message}
        inputProps={{ maxLength: 2 }}
        noBox={true}
      />
      <FormInput
        sx={{ width: "80%" }}
        label="Telefone"
        register={register("telefone", { required: true })}
        error={!!errors.telefone}
        helperText={(errors.telefone as FieldError)?.message}
        noBox={true}
      />
      {!errors.telefone && (
        <FormHelperText>DDD e Telefone aceita apenas números</FormHelperText>
      )}
    </Box>
  </>
);
