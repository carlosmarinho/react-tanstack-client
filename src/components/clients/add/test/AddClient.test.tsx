import AddClient from "../AddClient";
import {
  checkBasicClientFields,
  checkButtonBar,
  checkCompanyClientFields,
  renderWithProviders,
  selectClientTipo,
} from "../../../../test/testUtil";

describe("AddClient", () => {
  beforeEach(() => {
    renderWithProviders(<AddClient />);
    checkBasicClientFields();
  });

  it("should render correctly not selecting 'tipo'", async () => {
    // No additional code needed here, as the setup is done in beforeEach
  });

  it("should render correctly when selecting 'PF' tipo", async () => {
    await selectClientTipo("PF");

    checkBasicClientFields();
    checkButtonBar();
  });

  it("should render correctly when selecting 'PJ' tipo", async () => {
    await selectClientTipo("PJ");

    checkCompanyClientFields();
    checkButtonBar();
  });
});
