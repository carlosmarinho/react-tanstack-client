import React, { useEffect } from "react";
import { CLIENT_STRINGS } from "../strings";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientSchema } from "../../../types";
import { useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { PersonClientForm } from "./PersonClientForm";
import { CompanyClientForm } from "./CompanyClientForm";
import { BasicClientForm } from "./BasicClientForm";

interface ClientFormProps {
  actionClient: (data: unknown) => void;
  submitSuccess: boolean;
  submitError: Error | null;
  isSubmitting: boolean;
}

const formOptions = {
  resolver: zodResolver(ClientSchema),
};

const ClientForm: React.FC<ClientFormProps> = ({
  actionClient,
  submitSuccess,
  submitError,
  isSubmitting,
}) => {
  // State variables and event handlers can be defined here

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm(formOptions);

  useEffect(() => {
    if (submitSuccess) {
      reset();
    }
    // I really don't wanna to add reset to the dependency array, because it's reference doesn't change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitSuccess]);

  const tipo = watch("tipo");

  return (
    <form onSubmit={handleSubmit(actionClient)}>
      {submitSuccess && (
        <Alert severity="success">{CLIENT_STRINGS.CREATE_SUCCESS}</Alert>
      )}
      {submitError && (
        <Alert severity="error">{CLIENT_STRINGS.CREATE_ERROR}</Alert>
      )}
      <Box marginBottom={2}>
        <FormControl error={!!errors.tipo} fullWidth>
          <InputLabel id="tipo-label">{CLIENT_STRINGS.TIPO_LABEL}</InputLabel>
          <Select
            labelId="tipo-label"
            {...register("tipo", { required: true })}
          >
            <MenuItem value="">{CLIENT_STRINGS.SELECT_TIPO}</MenuItem>
            <MenuItem value="PF">{CLIENT_STRINGS.PF}</MenuItem>
            <MenuItem value="PJ">{CLIENT_STRINGS.PJ}</MenuItem>
          </Select>
          {errors.tipo && (
            <FormHelperText>{CLIENT_STRINGS.SELECT_TIPO}</FormHelperText>
          )}
        </FormControl>
      </Box>

      {tipo === "PF" && (
        <PersonClientForm register={register} errors={errors} />
      )}

      {tipo === "PJ" && (
        <CompanyClientForm register={register} errors={errors} />
      )}
      <BasicClientForm register={register} errors={errors} />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button type="submit" disabled={isSubmitting} variant="contained">
          {isSubmitting ? CLIENT_STRINGS.LOADING : CLIENT_STRINGS.SUBMIT}
        </Button>
      </Box>
    </form>
  );
};

export default ClientForm;
