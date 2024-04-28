import React, { useState } from "react";
import { ClientSchema } from "../../../types";

const EditClient = () => {
  const [formState, setFormState] = useState({
    tipo: "",
    nome: "",
    cpf: null,
    nomeFantasia: null,
    razaoSocial: null,
    cnpj: null,
    email: "",
    telefone: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      ClientSchema.parse(formState);
      const response = await fetch("/api/clients/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="tipo">Type:</label>
        <select
          name="tipo"
          id="tipo"
          value={formState.tipo}
          onChange={handleSelectChange}
        >
          <option value="">Select a type</option>
          <option value="PF">PF</option>
          <option value="PJ">PJ</option>
        </select>
      </div>
      {formState.tipo === "PF" && (
        <>
          <div>
            <label htmlFor="nome">Name:</label>
            <input
              name="nome"
              type="text"
              id="nome"
              value={formState.nome}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="cpf">CPF:</label>
            <input
              name="cpf"
              type="text"
              id="cpf"
              value={formState.cpf || ""}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      {formState.tipo === "PJ" && (
        <>
          <div>
            <label htmlFor="cnpj">CNPJ:</label>
            <input
              name="cnpj"
              type="text"
              id="cnpj"
              value={formState.cnpj || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="nomeFantasia">Fantasy Name:</label>
            <input
              name="nomeFantasia"
              type="text"
              id="nomeFantasia"
              value={formState.nomeFantasia || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="razaoSocial">Social Reason:</label>
            <input
              name="razaoSocial"
              type="text"
              id="razaoSocial"
              value={formState.razaoSocial || ""}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          id="email"
          value={formState.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="telefone">Phone:</label>
        <input
          name="telefone"
          type="text"
          id="telefone"
          value={formState.telefone}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditClient;
