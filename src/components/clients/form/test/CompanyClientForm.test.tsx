import { render, screen } from "@testing-library/react";
import { Wrapper } from "../../../../test/testUtil";
import { CompanyClientForm } from "../CompanyClientForm";

describe("PersonClientForm", () => {
  it("renders without crashing", () => {
    render(
      <Wrapper>
        {(props) => (
          <CompanyClientForm errors={props.errors} control={props.control} />
        )}
      </Wrapper>
    );

    screen.logTestingPlaygroundURL();

    expect(screen.getByLabelText(/cnpj/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /cnpj/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome Fantasia/i)).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /nome fantasia/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Razão Social/i)).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /razão social/i })
    ).toBeInTheDocument();
  });
});
