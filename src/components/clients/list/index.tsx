import { Delete, Edit } from "@mui/icons-material";
import {
  Alert,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useClient } from "../../../hooks/clientHooks";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { useState } from "react";

function ListClient() {
  const { clients, isLoading, removeClient, error, deleteError } = useClient();
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);

  async function openDeleteModal(id: number) {
    setIdToDelete(id);
    setOpen(true);
  }

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

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
            <ListItem
              sx={{ borderBottom: "1px solid #ccc" }}
              key={client.id}
              secondaryAction={
                <>
                  <Link to={`/edit-client/${client.id}`}>
                    <IconButton edge="end" aria-label="delete">
                      <Edit />
                    </IconButton>
                  </Link>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => openDeleteModal(client.id!)}
                  >
                    <Delete />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={
                  client.tipo === "PF" ? client.nome : client.nomeFantasia
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}

export default ListClient;
