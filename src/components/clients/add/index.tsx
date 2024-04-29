import { useForm, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientSchema } from "../../../types";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
  Box,
  Alert,
} from "@mui/material";
import { useEffect } from "react";
import useFormSubmit from "../../../hooks/clientSubmitHooks";
import { FormInput } from "../../form/formInput";

const formOptions = {
  resolver: zodResolver(ClientSchema),
};

const AddClient = () => {
  const { addClient, submitSuccess, submitError, isSubmitting } =
    useFormSubmit();

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

  const onSubmit = (data: unknown) => {
    addClient(data);
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
            <FormInput
              label="Nome"
              register={register("nome", { required: true })}
              error={!!errors.nome}
              helperText={(errors.nome as FieldError)?.message}
            />
          </Box>
          {/**
           * @todo add mask to this field maybe using react-input-mask to
           * allow separation between numbers
           */}
          <FormInput
            label="CPF"
            register={register("cpf", { required: true })}
            error={!!errors.cpf}
            helperText={(errors.cpf as FieldError)?.message}
            inputProps={{ maxLength: 11 }}
          >
            {!errors.cpf && (
              <FormHelperText>Este campo aceita apenas números</FormHelperText>
            )}
          </FormInput>
        </>
      )}

      {tipo === "PJ" && (
        <>
          <FormInput
            label="CNPJ"
            register={register("cnpj", { required: true })}
            error={!!errors.cnpj}
            helperText={(errors.cnpj as FieldError)?.message}
            inputProps={{ maxLength: 14 }}
          >
            {!errors.cnpj && (
              <FormHelperText>Este campo aceita apenas números!</FormHelperText>
            )}
          </FormInput>
          <FormInput
            label="Nome Fantasia"
            register={register("nomeFantasia", { required: true })}
            error={!!errors.nomeFantasia}
            helperText={(errors.nomeFantasia as FieldError)?.message}
          />
          <FormInput
            label="Razão Social"
            register={register("razaoSocial", { required: true })}
            error={!!errors.razaoSocial}
            helperText={(errors.razaoSocial as FieldError)?.message}
          />
        </>
      )}
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
          helperText={
            errors.telefone &&
            "Campo Telefone é obrigatório e deve começar com o número 9"
          }
          inputProps={{ maxLength: 9 }}
          noBox={true}
        />
        {!errors.telefone && (
          <FormHelperText>DDD e Telefone aceita apenas números</FormHelperText>
        )}
      </Box>

      <Button type="submit" disabled={isSubmitting} variant="contained">
        {isSubmitting ? "Loading..." : "Enviar"}
      </Button>
    </form>
  );
};

export default AddClient;
