import { render, screen } from "@testing-library/react";
import { Wrapper } from "../../../../test/testUtil";
import { BasicClientForm } from "../BasicClientForm";

describe("BasicClientForm", () => {
  it("should renders correctly", () => {
    render(
      <Wrapper>
        {(props) => (
          <BasicClientForm errors={props.errors} control={props.control} />
        )}
      </Wrapper>
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
