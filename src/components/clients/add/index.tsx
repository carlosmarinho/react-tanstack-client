import { useForm } from "react-hook-form";
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
} from "@mui/material";

const AddClient = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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

      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const tipo = watch("tipo");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              helperText={errors.nome && "Este campo é obrigatório"}
              fullWidth
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              label="CPF"
              {...register("cpf", { required: true })}
              error={!!errors.cpf}
              helperText={errors.cpf && "Este campo é obrigatório"}
              fullWidth
            />
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
              helperText={errors.cnpj && "Este campo é obrigatório"}
              fullWidth
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              label="Nome Fantasia"
              {...register("nomeFantasia", { required: true })}
              error={!!errors.nomeFantasia}
              helperText={errors.nomeFantasia && "Este campo é obrigatório"}
              fullWidth
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              label="Razão Social"
              {...register("razaoSocial", { required: true })}
              error={!!errors.razaoSocial}
              helperText={errors.razaoSocial && "Este campo é obrigatório"}
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
          fullWidth
        />
      </Box>

      <Box marginBottom={2}>
        <TextField
          sx={{ width: "18%", marginRight: "10px" }}
          label="DDD"
          {...register("ddd", { required: true, pattern: /^[0-9]{2}$/ })}
          error={!!errors.ddd}
          helperText={
            errors.ddd &&
            "Este campo é obrigatório e deve ter exatamente 2 dígitos"
          }
          inputProps={{ maxLength: "2" }}
        />
        <TextField
          sx={{ width: "80%" }}
          label="Telefone"
          {...register("telefone", { required: true })}
          error={!!errors.telefone}
          helperText={errors.telefone && "Este campo é obrigatório"}
          inputProps={{ maxLength: "9" }}
        />
      </Box>

      <Button type="submit" variant="contained">
        Enviar
      </Button>
    </form>
  );
};

export default AddClient;
