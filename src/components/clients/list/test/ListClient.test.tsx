import { render, screen } from "@testing-library/react";
import { useClient } from "../../../../hooks/useClient";
import ListClient from "../ListClient";
import { mockClients } from "../../../../mocks/clients";
import { renderWithProviders } from "../../../../test/testUtil";

jest.mock("../../../../hooks/useClient");

describe("ListClient", () => {
  it("renders loading state correctly", () => {
    (useClient as jest.Mock).mockReturnValue({
      clients: [],
      isLoading: true,
      removeClient: jest.fn(),
      error: null,
      deleteError: null,
    });

    render(<ListClient />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error state correctly", () => {
    const errorMessage = "An error occurred";

    (useClient as jest.Mock).mockReturnValue({
      clients: [],
      isLoading: false,
      removeClient: jest.fn(),
      error: { message: errorMessage },
      deleteError: null,
    });

    render(<ListClient />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("renders empty state correctly", () => {
    (useClient as jest.Mock).mockReturnValue({
      clients: [],
      isLoading: false,
      removeClient: jest.fn(),
      error: null,
      deleteError: null,
    });

    render(<ListClient />);

    expect(screen.getByText("Sem clientes cadastrados!")).toBeInTheDocument();
  });

  it("renders clients list correctly", () => {
    const clients = mockClients;

    (useClient as jest.Mock).mockReturnValue({
      clients,
      isLoading: false,
      removeClient: jest.fn(),
      error: null,
      deleteError: null,
    });

    renderWithProviders(<ListClient />);

    clients.forEach((client) => {
      if (client.tipo === "PF") {
        expect(screen.getByText(client.nome)).toBeInTheDocument();
      } else {
        expect(screen.getByText(client.nomeFantasia)).toBeInTheDocument();
      }
    });
  });
});
