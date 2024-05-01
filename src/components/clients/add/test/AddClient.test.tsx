import AddClient from "../AddClient";
import { checkField, renderWithProviders } from "../../../../test/testUtil";
import userEvent from "@testing-library/user-event";
import { screen, within } from "@testing-library/react";

describe("AddClient", () => {
  it("should render correctly not selecting 'tipo'", async () => {
    renderWithProviders(<AddClient />);
    checkField("email", "textbox");
    checkField("ddd", "textbox");
    checkField("telefone", "textbox");
  });

  it("should render correctly when selecting 'PF' tipo", async () => {
    renderWithProviders(<AddClient />);

    checkField("email", "textbox");
    checkField("ddd", "textbox");
    checkField("telefone", "textbox");

    const selectLabel = /Tipo/i;
    const selectEl = await screen.findByLabelText(/Tipo/i);
    await userEvent.click(selectEl);

    expect(selectEl).toBeInTheDocument();

    const optionsPopupEl = await screen.findByRole("listbox", {
      name: selectLabel,
    });

    // Click an option in the popup.
    await userEvent.click(within(optionsPopupEl).getByText(/PF/i));

    checkField("email", "textbox");
    checkField("ddd", "textbox");
    checkField("telefone", "textbox");

    screen.getByRole("button", { name: /voltar/i });
    screen.getByRole("button", { name: /cadastrar/i });
  });

  it.only("should render correctly when selecting 'PJ' tipo", async () => {
    renderWithProviders(<AddClient />);

    checkField("email", "textbox");
    checkField("ddd", "textbox");
    checkField("telefone", "textbox");

    const selectLabel = /Tipo/i;
    const selectEl = await screen.findByLabelText(/Tipo/i);
    await userEvent.click(selectEl);

    expect(selectEl).toBeInTheDocument();

    const optionsPopupEl = await screen.findByRole("listbox", {
      name: selectLabel,
    });

    // Click an option in the popup.
    await userEvent.click(within(optionsPopupEl).getByText(/PJ/i));

    checkField("cnpj", "textbox");
    checkField("Nome Fantasia", "textbox");
    checkField("Razão Social", "textbox");

    screen.getByRole("button", { name: /voltar/i });
    screen.getByRole("button", { name: /cadastrar/i });
  });
});
