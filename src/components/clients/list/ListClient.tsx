import { Alert, Box, CircularProgress, List, Typography } from "@mui/material";
import { useClient } from "../../../hooks/clientHooks";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { useState } from "react";
import ClientListItem from "./ClientListItem";

function ListClient() {
  const { clients, isLoading, removeClient, error, deleteError } = useClient();
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);

  async function openDeleteModal(id: number) {
    setIdToDelete(id);
    setOpen(true);
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  console.log("clients no map", clients);

  return (
    <>
      <ConfirmDeleteDialog
        open={open}
        onClose={() => setOpen(false)}
        removeClient={removeClient}
        idToDelete={idToDelete}
      />
      {(error || deleteError) && (
        <Alert severity="error">{error?.message || deleteError?.message}</Alert>
      )}
      {clients?.length === 0 ? (
        <Typography>Sem clientes cadastrados!</Typography>
      ) : (
        <List dense>
          {clients?.map((client) => (
            <ClientListItem
              key={client.id}
              client={client}
              openDeleteModal={openDeleteModal}
            />
          ))}
        </List>
      )}
    </>
  );
}

export default ListClient;
