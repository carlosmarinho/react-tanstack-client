import { render } from "@testing-library/react";
import { BasicClientForm } from "../BasicClientForm";
import Wrapper from "../../../../test/Wrapper";
import { checkField } from "../../../../test/testUtil";

describe("BasicClientForm", () => {
  it("should renders correctly", () => {
    render(
      <Wrapper>
        {(props) => (
          <BasicClientForm errors={props.errors} control={props.control} />
        )}
      </Wrapper>
    );

    checkField("email", "textbox");
    checkField("ddd", "textbox");
    checkField("telefone", "textbox");
  });
});
