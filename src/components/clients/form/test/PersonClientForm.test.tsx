import { render } from "@testing-library/react";
import { PersonClientForm } from "../PersonClientForm";
import Wrapper from "../../../../test/Wrapper";
import { checkPersonClientFields } from "../../../../test/testUtil";

describe("PersonClientForm", () => {
  it("should renders correctly", () => {
    render(
      <Wrapper>
        {(props) => (
          <PersonClientForm errors={props.errors} control={props.control} />
        )}
      </Wrapper>
    );

    checkPersonClientFields();
  });
});
