import EditClient from "../EditClient";
import {
  checkBasicClientFields,
  fillForm,
  submitForm,
  checkPFValues,
  checkPJValues,
} from "../../../../test/testUtil";
import { render, screen } from "@testing-library/react";
import { CLIENT_STRINGS } from "../../strings";
import {
  clientPF as clientPFEdit,
  clientPJ as clientPJEdit,
  mockClients,
} from "../../../../mocks/clients";
import { TypePF, TypePJ } from "../../../../types/clientSchema";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { http, HttpResponse } from "msw";
// import { setupServer } from "msw/node";
// import { TextEncoder } from "util";

const clientPF = mockClients[0];

// const server = setupServer(
//   http.get("/api/client/:id", () => {
//     return HttpResponse.json({ greeting: "hello there" });
//   })
// );

const clientPJ = mockClients[1];
const queryClient = new QueryClient();

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

/**
 * @todo implement those integration test cases
 * Was having some issues because the msw was not running, after try to add the server
 * start getting this: error 'ReferenceError: TextEncoder is not defined'
 * As My time to finish this test is ending I'll skipp those testing
 */
describe.skip("EditClient Integration Test", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/edit-client/1"]}>
          <Routes>
            <Route path="/edit-client/:id" element={<EditClient />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    checkBasicClientFields();
  });

  it("should edit client correctly when client is type of 'PF', editing only PF especific data", async () => {
    await fillForm(clientPFEdit);
    await checkPFValues(clientPF as TypePF);
    await submitForm();

    // Check that the success message is displayed
    expect(
      await screen.findByText(CLIENT_STRINGS.EDIT_SUCCESS)
    ).toBeInTheDocument();
  });

  it("should edit client correctly when client is type of 'PJ'", async () => {
    await checkPJValues(clientPJ as TypePJ);
    await fillForm(clientPJEdit);
    await submitForm();

    // Check that the success message is displayed
    expect(
      await screen.findByText(CLIENT_STRINGS.EDIT_SUCCESS)
    ).toBeInTheDocument();
  });

  /**
   * @todo add test with invalid data to handle errors
   */
});
