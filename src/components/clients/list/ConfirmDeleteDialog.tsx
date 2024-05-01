import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CLIENT_STRINGS } from "../strings";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  removeClient: (id: number) => void;
  idToDelete: number;
}

/**@Todo we should have a dialog component and pass the props for this one */
export default function ConfirmDeleteDialog({
  open,
  onClose,
  removeClient,
  idToDelete,
}: ConfirmDeleteDialogProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            removeClient(idToDelete);
            handleClose();
          },
        }}
      >
        <DialogTitle>
          {CLIENT_STRINGS.DELETE_TITLE} {idToDelete}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {CLIENT_STRINGS.DELETE_CONFIRMATION} {idToDelete}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{CLIENT_STRINGS.CANCEL}</Button>
          <Button type="submit">{CLIENT_STRINGS.CONFIRM}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
