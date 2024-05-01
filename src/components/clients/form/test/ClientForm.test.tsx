import { render } from "@testing-library/react";
import ClientForm from "../ClientForm";
import { BrowserRouter as Router } from "react-router-dom";
import { checkField } from "../../../../test/testUtil";

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

    checkField("email", "textbox");
    checkField("ddd", "textbox");
    checkField("telefone", "textbox");
  });
});
