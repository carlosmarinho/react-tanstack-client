import { screen } from "@testing-library/react";

export function checkField(label: string, role: string) {
  const lowerCaseLabel = label.toLowerCase();

  expect(screen.getByLabelText(new RegExp(label, "i"))).toBeInTheDocument();
  expect(
    screen.getByRole(role, { name: new RegExp(lowerCaseLabel, "i") })
  ).toBeInTheDocument();
}
