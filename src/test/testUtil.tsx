import { render, screen, within } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

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
