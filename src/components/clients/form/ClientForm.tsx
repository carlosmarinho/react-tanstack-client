import React, { useEffect } from "react";
import { CLIENT_STRINGS } from "../strings";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientSchema } from "../../../types";
import { Controller, useForm } from "react-hook-form";
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
import { TypeClient } from "../../../types/clientSchema";
import { Navigate, useNavigate } from "react-router-dom";

interface ClientFormProps {
  client?: TypeClient;
  actionClient: (data: unknown) => void;
  submitSuccess: boolean;
  submitError: Error | null;
  isSubmitting: boolean;
}

const formOptions = {
  resolver: zodResolver(ClientSchema),
};

const ClientForm: React.FC<ClientFormProps> = ({
  client,
  actionClient,
  submitSuccess,
  submitError,
  isSubmitting,
}) => {
  // State variables and event handlers can be defined here
  const navigate = useNavigate();

  const {
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    control,
  } = useForm<TypeClient>({
    ...formOptions,
    defaultValues: client,
  });

  useEffect(() => {
    if (client) {
      reset(client);
    }
  }, [client, reset]);

  useEffect(() => {
    if (submitSuccess) {
      reset();
    }
    // I really don't wanna to add reset to the dependency array, because it's reference doesn't change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitSuccess]);

  const handleBack = () => {
    navigate("/"); // This is a fake function, it should be replaced by a real one
  };

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
          <Controller
            name="tipo"
            control={control}
            defaultValue={client?.tipo || undefined}
            render={({ field }) => (
              <Select labelId="tipo-label" {...field}>
                <MenuItem value="">{CLIENT_STRINGS.SELECT_TIPO}</MenuItem>
                <MenuItem value="PF">{CLIENT_STRINGS.PF}</MenuItem>
                <MenuItem value="PJ">{CLIENT_STRINGS.PJ}</MenuItem>
              </Select>
            )}
          />
          {errors.tipo && (
            <FormHelperText>{CLIENT_STRINGS.SELECT_TIPO}</FormHelperText>
          )}
        </FormControl>
      </Box>

      {tipo === "PF" && <PersonClientForm errors={errors} control={control} />}

      {tipo === "PJ" && <CompanyClientForm errors={errors} control={control} />}

      <BasicClientForm errors={errors} control={control} />
      <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Button onClick={handleBack} variant="contained">
          {CLIENT_STRINGS.BACK}
        </Button>
        <Button type="submit" disabled={isSubmitting} variant="contained">
          {isSubmitting ? CLIENT_STRINGS.LOADING : CLIENT_STRINGS.SUBMIT}
        </Button>
      </Box>
    </form>
  );
};

export default ClientForm;
