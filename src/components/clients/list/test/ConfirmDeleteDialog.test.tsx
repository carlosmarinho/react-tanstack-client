import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import { CLIENT_STRINGS } from "../../strings";
import { mockClients } from "../../../../mocks/clients";

const clientPJ = mockClients[1];

describe("ConfirmDeleteDialog", () => {
  it("renders correctly when open", () => {
    const onCloseMock = jest.fn();
    const removeClientMock = jest.fn();

    render(
      <ConfirmDeleteDialog
        open={true}
        onClose={onCloseMock}
        removeClient={removeClientMock}
        idToDelete={clientPJ.id!}
      />
    );

    expect(
      screen.getByText(CLIENT_STRINGS.DELETE_TITLE + clientPJ.id)
    ).toBeInTheDocument();
  });

  it("calls removeClient with correct id when confirm button is clicked", async () => {
    const onCloseMock = jest.fn();
    const removeClientMock = jest.fn();

    render(
      <ConfirmDeleteDialog
        open={true}
        onClose={onCloseMock}
        removeClient={removeClientMock}
        idToDelete={clientPJ.id!}
      />
    );

    await userEvent.click(screen.getByText(CLIENT_STRINGS.CONFIRM));
    expect(removeClientMock).toHaveBeenCalledWith(clientPJ.id);
  });

  it("calls onClose when cancel button is clicked", async () => {
    const onCloseMock = jest.fn();
    const removeClientMock = jest.fn();

    render(
      <ConfirmDeleteDialog
        open={true}
        onClose={onCloseMock}
        removeClient={removeClientMock}
        idToDelete={clientPJ.id!}
      />
    );

    await userEvent.click(screen.getByText(CLIENT_STRINGS.CANCEL));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
