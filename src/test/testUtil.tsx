import { render, screen, within } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { CLIENT_STRINGS } from "../components/clients/strings";
import {
  TypeBasicClient,
  TypeClient,
  TypePF,
  TypePJ,
} from "../types/clientSchema";

export function renderWithRouter(component: JSX.Element) {
  render(<Router>{component}</Router>);
}

export function renderWithProviders(component: JSX.Element) {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <Router>{component}</Router>
    </QueryClientProvider>
  );
}

export function checkField(label: string, role: string) {
  const lowerCaseLabel = label.toLowerCase();

  expect(screen.getByLabelText(new RegExp(label, "i"))).toBeInTheDocument();
  expect(
    screen.getByRole(role, { name: new RegExp(lowerCaseLabel, "i") })
  ).toBeInTheDocument();
}

export function checkBasicClientFields() {
  checkField("email", "textbox");
  checkField("ddd", "textbox");
  checkField("telefone", "textbox");
}

export function checkCompanyClientFields() {
  checkField("cnpj", "textbox");
  checkField("Nome Fantasia", "textbox");
  checkField("Razão Social", "textbox");
}

export function checkPersonClientFields() {
  checkField("nome", "textbox");
  checkField("cpf", "textbox");
}

export function checkButtonBar(type: string = "add") {
  const buttonType = type === "add" ? "cadastrar" : "editar";

  screen.getByRole("button", { name: /voltar/i });
  screen.getByRole("button", { name: new RegExp(buttonType, "i") });
}

export async function selectClientTipo(tipo: string) {
  const selectLabel = /Tipo/i;
  const selectEl = await screen.findByLabelText(selectLabel);
  await userEvent.click(selectEl);

  const optionsPopupEl = await screen.findByRole("listbox", {
    name: selectLabel,
  });
  await userEvent.click(within(optionsPopupEl).getByText(tipo));
}

export async function checkClientTipo(tipo: string) {
  const selectLabel = /Tipo/i;
  const selectEl = (await screen.findByLabelText(
    selectLabel
  )) as HTMLDivElement;

  expect(selectEl.textContent).toBe(tipo);
}

export async function checkPFValues(client: TypePF) {
  const nomeInput = await screen.findByRole("textbox", {
    name: /nome/i,
  });
  const cpfInput = await screen.findByRole("textbox", {
    name: /cpf/i,
  });

  expect(nomeInput).toHaveValue(client.nome);
  expect(cpfInput).toHaveValue(client.cpf);
}

export async function checkPJValues(client: TypePJ) {
  const nomeFantasiaInput = await screen.findByRole("textbox", {
    name: /nome fantasia/i,
  });
  const razaoSocialInput = await screen.findByRole("textbox", {
    name: /razão social/i,
  });
  const cnpjInput = await screen.findByRole("textbox", {
    name: /cnpj/i,
  });

  expect(nomeFantasiaInput).toHaveValue(client.nomeFantasia);
  expect(razaoSocialInput).toHaveValue(client.razaoSocial);
  expect(cnpjInput).toHaveValue(client.cnpj);
}

export async function fillBasic({ email, ddd, telefone }: TypeBasicClient) {
  const emailInput = await screen.findByRole("textbox", {
    name: /email/i,
  });

  const dddInput = await screen.findByRole("textbox", {
    name: /ddd/i,
  });

  const telefoneInput = await screen.findByRole("textbox", {
    name: /telefone/i,
  });

  await userEvent.clear(emailInput);
  await userEvent.type(emailInput, email);
  expect(emailInput).toHaveValue(email);

  await userEvent.clear(dddInput);
  await userEvent.type(dddInput, ddd);
  expect(dddInput).toHaveValue(ddd);

  await userEvent.clear(telefoneInput);
  await userEvent.type(telefoneInput, telefone);
  expect(telefoneInput).toHaveValue(telefone);
}

export async function fillPF(client: TypePF) {
  const nomeInput = await screen.findByRole("textbox", {
    name: /nome/i,
  });

  const cpfInput = await screen.findByRole("textbox", {
    name: /cpf/i,
  });

  await userEvent.type(nomeInput, client.nome);
  await userEvent.type(cpfInput, client.cpf);
}

export async function fillPJ(client: TypePJ) {
  const nomeFantasiaInput = await screen.findByRole("textbox", {
    name: /nome fantasia/i,
  });
  const razaoSocialInput = await screen.findByRole("textbox", {
    name: /razão social/i,
  });
  const cnpjInput = await screen.findByRole("textbox", {
    name: /cnpj/i,
  });

  await userEvent.type(nomeFantasiaInput, client.nomeFantasia);
  await userEvent.type(razaoSocialInput, client.razaoSocial);
  await userEvent.type(cnpjInput, client.cnpj);
}

export async function fillForm(client: TypeClient) {
  await fillBasic({
    tipo: client.tipo,
    email: client.email,
    ddd: client.ddd,
    telefone: client.telefone,
  });

  if (client.tipo === "PF") {
    await fillPF(client);
  } else {
    await fillPJ(client);
  }
}

export async function submitForm() {
  const submitButton = screen.getByText(CLIENT_STRINGS.SUBMIT);
  await userEvent.click(submitButton);
}
