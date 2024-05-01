import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";

export function renderWithProviders(component: JSX.Element) {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <Router>{component}</Router>
    </QueryClientProvider>
  );
}

export function checkField(label: string, role: string) {
  const lowerCaseLabel = label.toLowerCase();

  expect(screen.getByLabelText(new RegExp(label, "i"))).toBeInTheDocument();
  expect(
    screen.getByRole(role, { name: new RegExp(lowerCaseLabel, "i") })
  ).toBeInTheDocument();
}

export function checkBasicClientFields() {
  checkField("email", "textbox");
  checkField("ddd", "textbox");
  checkField("telefone", "textbox");
}
