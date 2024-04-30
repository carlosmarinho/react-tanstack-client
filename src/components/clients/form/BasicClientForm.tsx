import { FC } from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import { FormInput } from "../../customForm/formInput";
import { Box, FormHelperText } from "@mui/material";

import { FieldValues } from "react-hook-form";
import { TypeClient } from "../../../types/clientSchema";
import { CLIENT_STRINGS } from "../strings";

export interface ClientFormProps {
  errors: FieldErrors<FieldValues>;
  control: Control<TypeClient>;
}

export const BasicClientForm: FC<ClientFormProps> = ({ errors, control }) => (
  <>
    <Controller
      name="email"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormInput
          label={CLIENT_STRINGS.EMAIL}
          error={!!errors.email}
          helperText={errors.email && CLIENT_STRINGS.EMAIL_ERROR}
          fullWidth
          field={field}
        />
      )}
    />

    <Box marginBottom={2}>
      <Controller
        name="ddd"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            sx={{ width: "18%", marginRight: "10px" }}
            label={CLIENT_STRINGS.DDD}
            error={!!errors.ddd}
            helperText={(errors.ddd as FieldError)?.message}
            inputProps={{ maxLength: 2 }}
            maxLength="2"
            noBox={true}
            field={field}
          />
        )}
      />

      <Controller
        name="telefone"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            sx={{ width: "80%" }}
            label={CLIENT_STRINGS.TELEPHONE}
            error={!!errors.telefone}
            helperText={(errors.telefone as FieldError)?.message}
            maxLength="9"
            noBox={true}
            field={field}
          />
        )}
      />
      {!errors.telefone && (
        <FormHelperText>{CLIENT_STRINGS.TELEPHONE_HELP}</FormHelperText>
      )}
    </Box>
  </>
);
