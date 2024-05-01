import AddClient from "../AddClient";
import {
  checkBasicClientFields,
  renderWithProviders,
  selectClientTipo,
  fillForm,
  submitForm,
} from "../../../../test/testUtil";
import { screen } from "@testing-library/react";
import { CLIENT_STRINGS } from "../../strings";
import { TypePF, TypePJ } from "../../../../types/clientSchema";

const clientPF: TypePF = {
  tipo: "PF",
  email: "testpf@example.com",
  ddd: "11",
  telefone: "955516234",
  nome: "Test Person",
  cpf: "92511930021",
};

const clientPJ: TypePJ = {
  tipo: "PJ",
  email: "testpj@example.com",
  ddd: "11",
  telefone: "922251234",
  nomeFantasia: "Test Company",
  razaoSocial: "Test Company Ltda",
  cnpj: "85359859000144",
};

describe("AddClient Integration Test", () => {
  beforeEach(() => {
    renderWithProviders(<AddClient />);
    checkBasicClientFields();
  });

  it("should submit the form correctly when 'PF' tipo is selected", async () => {
    await selectClientTipo(clientPF.tipo);
    await fillForm(clientPF); // Assuming fillForm function fills the form fields

    await submitForm();

    // Check that the success message is displayed
    expect(
      await screen.findByText(CLIENT_STRINGS.CREATE_SUCCESS)
    ).toBeInTheDocument();
  });

  it("should submit the form correctly when 'PJ' tipo is selected", async () => {
    await selectClientTipo("PJ");
    await fillForm(clientPJ); // Assuming fillForm function fills the form fields

    await submitForm();

    // Check that the success message is displayed
    expect(
      await screen.findByText(CLIENT_STRINGS.CREATE_SUCCESS)
    ).toBeInTheDocument();
  });
});
