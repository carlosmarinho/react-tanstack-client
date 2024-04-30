import { render, screen } from "@testing-library/react";
import { PersonClientForm } from "../PersonClientForm";
import { Wrapper } from "../../../../test/testUtil";

describe("PersonClientForm", () => {
  it("renders without crashing", () => {
    render(
      <Wrapper>
        {(props) => (
          <PersonClientForm errors={props.errors} control={props.control} />
        )}
      </Wrapper>
    );

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /nome/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /cpf/i })).toBeInTheDocument();
  });
});
