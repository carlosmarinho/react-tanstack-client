import { useForm } from "react-hook-form";
import { ClientSchema } from "../../../types";

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
      <div>
        <label htmlFor="tipo">Type:</label>
        <select {...register("tipo", { required: true })}>
          <option value="">Select a type</option>
          <option value="PF">PF</option>
          <option value="PJ">PJ</option>
        </select>
        {errors.tipo && <p>This field is required</p>}
      </div>
      {tipo === "PF" && (
        <>
          <div>
            <label htmlFor="nome">Name:</label>
            <input {...register("nome", { required: true })} />
            {errors.nome && <p>This field is required</p>}
          </div>
          <div>
            <label htmlFor="cpf">CPF:</label>
            <input {...register("cpf", { required: true })} />
            {errors.cpf && <p>This field is required</p>}
          </div>
        </>
      )}
      {tipo === "PJ" && (
        <>
          <div>
            <label htmlFor="cnpj">CNPJ:</label>
            <input {...register("cnpj", { required: true })} />
            {errors.cnpj && <p>This field is required</p>}
          </div>
          <div>
            <label htmlFor="nomeFantasia">Fantasy Name:</label>
            <input {...register("nomeFantasia", { required: true })} />
            {errors.nomeFantasia && <p>This field is required</p>}
          </div>
          <div>
            <label htmlFor="razaoSocial">Social Reason:</label>
            <input {...register("razaoSocial", { required: true })} />
            {errors.razaoSocial && <p>This field is required</p>}
          </div>
        </>
      )}
      <div>
        <label htmlFor="email">Email:</label>
        <input {...register("email", { required: true })} />
        {errors.email && <p>This field is required</p>}
      </div>
      <div>
        <label htmlFor="telefone">Phone:</label>
        <input {...register("telefone", { required: true })} />
        {errors.telefone && <p>This field is required</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddClient;
