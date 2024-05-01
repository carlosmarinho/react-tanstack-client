import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClientListItem from "../ClientListItem";
import { mockClients } from "../../../../mocks/clients";
import { renderWithRouter } from "../../../../test/testUtil";

const clientPF = mockClients[0];

// Mock the Link component
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: jest.fn(({ to, children }) => (
    <div data-testid="link" data-to={to}>
      {children}
    </div>
  )),
}));

describe("ClientListItem", () => {
  // Component renders properly
  it("renders properly", () => {
    const openDeleteModalMock = jest.fn();

    renderWithRouter(
      <ClientListItem client={clientPF} openDeleteModal={openDeleteModalMock} />
    );

    // I need to check the 'nome' cause it belongs to a client PF, else I get a typescript error on clientPF.nome
    if ("nome" in clientPF) {
      const clientName = screen.getByText(clientPF.nome);
      expect(clientName).toBeInTheDocument();
    }
  });

  // Clicking on edit button
  it("navigates to the correct path when edit button is clicked", async () => {
    const openDeleteModalMock = jest.fn();

    renderWithRouter(
      <ClientListItem client={clientPF} openDeleteModal={openDeleteModalMock} />
    );

    const editButton = screen.getByLabelText(/Edit client/i); // replace with the actual aria-label of your edit button
    await userEvent.click(editButton);

    const link = screen.getByTestId("link");
    expect(link).toHaveAttribute("data-to", `/edit-client/${clientPF.id}`);
  });

  //Clicking on delete button
  it("calls openDeleteModal when delete button is clicked", async () => {
    const openDeleteModalMock = jest.fn();

    renderWithRouter(
      <ClientListItem openDeleteModal={openDeleteModalMock} client={clientPF} />
    );

    const deleteButton = screen.getByLabelText(`Delete client ${clientPF.id}`);
    await userEvent.click(deleteButton);

    expect(openDeleteModalMock).toHaveBeenCalled();
  });
});
