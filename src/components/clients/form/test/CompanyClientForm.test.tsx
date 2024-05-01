import { render } from "@testing-library/react";
import { CompanyClientForm } from "../CompanyClientForm";
import Wrapper from "../../../../test/Wrapper";
import { checkCompanyClientFields } from "../../../../test/testUtil";

describe("CompanyClientForm", () => {
  it("should renders correctly", () => {
    render(
      <Wrapper>
        {(props) => (
          <CompanyClientForm errors={props.errors} control={props.control} />
        )}
      </Wrapper>
    );

    checkCompanyClientFields();
  });
});
