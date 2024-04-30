import { render, screen } from "@testing-library/react";
import ClientForm from "../ClientForm";
import { BrowserRouter as Router } from "react-router-dom";

describe("ClientForm", () => {
  it("should render correctly", () => {
    const mockActionClient = jest.fn();

    render(
      <Router>
        <ClientForm
          actionClient={mockActionClient}
          submitSuccess={false}
          submitError={null}
          isSubmitting={false}
        />
      </Router>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/ddd/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /ddd/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /telefone/i })
    ).toBeInTheDocument();
  });
});
