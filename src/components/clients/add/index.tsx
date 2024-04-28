import { useForm, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientSchema } from "../../../types";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
  Box,
  Alert,
} from "@mui/material";
import { useState } from "react";

const formOptions = {
  resolver: zodResolver(ClientSchema),
};

const AddClient = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = async (data: unknown) => {
    try {
      ClientSchema.parse(data);
      const response = await fetch("/api/clients/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(true);
    }
  };

  const tipo = watch("tipo");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {submitSuccess && (
        <Alert severity="success">Cliente cadastrado com sucesso!</Alert>
      )}
      {submitError && (
        <Alert severity="error">
          Um erro ocorreu ao tentar cadastrar o cliente!.
        </Alert>
      )}
      <Box marginBottom={2}>
        <FormControl error={!!errors.tipo} fullWidth>
          <InputLabel id="tipo-label">Tipo</InputLabel>
          <Select
            labelId="tipo-label"
            {...register("tipo", { required: true })}
          >
            <MenuItem value="">Selecione o tipo</MenuItem>
            <MenuItem value="PF">PF</MenuItem>
            <MenuItem value="PJ">PJ</MenuItem>
          </Select>
          {errors.tipo && (
            <FormHelperText>Este campo é obrigatório</FormHelperText>
          )}
        </FormControl>
      </Box>

      {tipo === "PF" && (
        <>
          <Box marginBottom={2}>
            <TextField
              label="Nome"
              {...register("nome", { required: true })}
              error={!!errors.nome}
              helperText={(errors.nome as FieldError)?.message}
              fullWidth
            />
          </Box>
          {/**
           * @todo add mask to this field maybe using react-input-mask to
           * allow separation between numbers
           */}
          <Box marginBottom={2}>
            <TextField
              label="CPF"
              {...register("cpf", { required: true })}
              error={!!errors.cpf}
              helperText={(errors.cpf as FieldError)?.message}
              fullWidth
              inputProps={{ maxLength: "11" }}
            />
            {!errors.cpf && (
              <FormHelperText>Este campo aceita apenas números</FormHelperText>
            )}
          </Box>
        </>
      )}

      {tipo === "PJ" && (
        <>
          <Box marginBottom={2}>
            <TextField
              label="CNPJ"
              {...register("cnpj", { required: true })}
              error={!!errors.cnpj}
              helperText={(errors.cnpj as FieldError)?.message}
              fullWidth
              inputProps={{ maxLength: "14" }}
            />
            {!errors.cnpj && (
              <FormHelperText>Este campo aceita apenas números!</FormHelperText>
            )}
          </Box>
          <Box marginBottom={2}>
            <TextField
              label="Nome Fantasia"
              {...register("nomeFantasia", { required: true })}
              error={!!errors.nomeFantasia}
              helperText={(errors.nomeFantasia as FieldError)?.message}
              fullWidth
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              label="Razão Social"
              {...register("razaoSocial", { required: true })}
              error={!!errors.razaoSocial}
              helperText={(errors.razaoSocial as FieldError)?.message}
              fullWidth
            />
          </Box>
        </>
      )}

      <Box marginBottom={2}>
        <TextField
          label="Email"
          {...register("email", { required: true })}
          error={!!errors.email}
          helperText={errors.email && "Este campo é obrigatório"}
          // helperText={errors.email?.message}
          fullWidth
        />
      </Box>

      <Box marginBottom={2}>
        <TextField
          sx={{ width: "18%", marginRight: "10px" }}
          label="DDD"
          {...register("ddd", { required: true, pattern: /^[0-9]{2}$/ })}
          error={!!errors.ddd}
          helperText={(errors.ddd as FieldError)?.message}
          inputProps={{ maxLength: "2" }}
        />
        <TextField
          sx={{ width: "80%" }}
          label="Telefone"
          {...register("telefone", { required: true })}
          error={!!errors.telefone}
          helperText={
            errors.telefone &&
            "Campo Telefone é obrigatório e deve começar com o número 9"
          }
          inputProps={{ maxLength: "9" }}
        />
        {!errors.telefone && (
          <FormHelperText>DDD e Telefone aceita apenas números</FormHelperText>
        )}
      </Box>

      <Button type="submit" variant="contained">
        Enviar
      </Button>
    </form>
  );
};

export default AddClient;
