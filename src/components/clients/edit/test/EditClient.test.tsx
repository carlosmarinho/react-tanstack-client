import EditClient from "../EditClient";
import {
  checkClientTipo,
  // checkBasicClientFields,
  // checkBasicClientFields,
  // checkButtonBar,
  // checkCompanyClientFields,
  // checkPersonClientFields,
  renderWithProviders,
  // selectClientTipo,
} from "../../../../test/testUtil";
import { fetchClient, submitEditClient } from "../../../../api/client";

import { mockClients } from "../../../../mocks/clients";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CLIENT_STRINGS } from "../../strings";
// import { CLIENT_STRINGS } from "../../strings";

jest.mock("../../../../api/client", () => ({
  fetchClient: jest.fn(),
  submitEditClient: jest.fn(),
}));

const clientPF = mockClients[0];
const clientPJ = mockClients[1];

describe("EditClient", () => {
  beforeEach(() => {});

  it("should render correctly for a client type 'PF'", async () => {
    (fetchClient as jest.Mock).mockImplementation(() =>
      Promise.resolve(clientPF)
    );

    renderWithProviders(<EditClient />);

    if (clientPF.tipo !== "PF") {
      throw new Error("Client type is not 'PF'");
    }

    const { email, ddd, telefone, nome, cpf } = clientPF;
    const emailInput = await screen.findByRole("textbox", {
      name: /email/i,
    });
    expect(emailInput).toHaveValue(email);

    const dddInput = await screen.findByRole("textbox", {
      name: /ddd/i,
    });
    expect(dddInput).toHaveValue(ddd);

    const telefoneInput = await screen.findByRole("textbox", {
      name: /telefone/i,
    });
    expect(telefoneInput).toHaveValue(telefone);

    checkClientTipo("PF");

    const nomeInput = await screen.findByRole("textbox", {
      name: /nome/i,
    });
    expect(nomeInput).toHaveValue(nome);

    const cpfInput = await screen.findByRole("textbox", {
      name: /cpf/i,
    });
    expect(cpfInput).toHaveValue(cpf);
  });

  it("should render correctly for a client type 'PJ'", async () => {
    (fetchClient as jest.Mock).mockImplementation(() =>
      Promise.resolve(clientPJ)
    );

    renderWithProviders(<EditClient />);

    if (clientPJ.tipo !== "PJ") {
      throw new Error("Client type is not 'PJ'");
    }

    const { email, ddd, telefone, nomeFantasia, razaoSocial, cnpj } = clientPJ;
    const emailInput = await screen.findByRole("textbox", {
      name: /email/i,
    });
    expect(emailInput).toHaveValue(email);

    const dddInput = await screen.findByRole("textbox", {
      name: /ddd/i,
    });
    expect(dddInput).toHaveValue(ddd);

    const telefoneInput = await screen.findByRole("textbox", {
      name: /telefone/i,
    });
    expect(telefoneInput).toHaveValue(telefone);

    checkClientTipo("PJ");

    const nomeFantasiaInput = await screen.findByRole("textbox", {
      name: /nome fantasia/i,
    });
    expect(nomeFantasiaInput).toHaveValue(nomeFantasia);

    const razaoSocialInput = await screen.findByRole("textbox", {
      name: /razão social/i,
    });
    expect(razaoSocialInput).toHaveValue(razaoSocial);

    const cnpjInput = await screen.findByRole("textbox", {
      name: /cnpj/i,
    });
    expect(cnpjInput).toHaveValue(cnpj);
  });

  it("should click on Editar button and get success message", async () => {
    (fetchClient as jest.Mock).mockImplementation(() =>
      Promise.resolve(clientPF)
    );

    (submitEditClient as jest.Mock).mockImplementation(() =>
      Promise.resolve({ id: clientPF.id })
    );

    renderWithProviders(<EditClient />);

    if (clientPF.tipo !== "PF") {
      throw new Error("Client type is not 'PF'");
    }

    const { nome } = clientPF;
    const newName = `${nome} edited`;

    const nomeInput = await screen.findByRole("textbox", {
      name: /nome/i,
    });
    expect(nomeInput).toHaveValue(nome);

    userEvent.type(nomeInput, newName);

    const submitButton = await screen.findByRole("button", {
      name: /editar/i,
    });
    await userEvent.click(submitButton);

    screen.logTestingPlaygroundURL();

    const successMessage = await screen.findByText(CLIENT_STRINGS.EDIT_SUCCESS);
    expect(successMessage).toBeInTheDocument();

    // expect(nomeInput).toHaveValue(newName);
  });
});
