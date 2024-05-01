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
import { clientPF, clientPJ } from "../../../../mocks/clients";

describe("AddClient Integration Test", () => {
  beforeEach(() => {
    renderWithProviders(<AddClient />);
    checkBasicClientFields();
  });

  it("should add client correctly when client is type of 'PF'", async () => {
    await selectClientTipo(clientPF.tipo);
    await fillForm(clientPF); // Assuming fillForm function fills the form fields

    await submitForm();

    // Check that the success message is displayed
    expect(
      await screen.findByText(CLIENT_STRINGS.CREATE_SUCCESS)
    ).toBeInTheDocument();
  });

  it("should add client correctly when client is type of 'PJ'", async () => {
    await selectClientTipo("PJ");
    await fillForm(clientPJ); // Assuming fillForm function fills the form fields

    await submitForm();

    // Check that the success message is displayed
    expect(
      await screen.findByText(CLIENT_STRINGS.CREATE_SUCCESS)
    ).toBeInTheDocument();
  });

  /**
   * @todo add test with invalid data to handle errors
   */
});
