import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { TypeClient } from "../../../types/clientSchema";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function ListClient() {
  const queryClient = useQueryClient();

  const fetchClients = useCallback(async () => {
    const response = await fetch("/api/clients");
    return (await response.json()) as TypeClient[];
  }, []);

  const deleteClient = useCallback(async (id: number) => {
    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: "DELETE",
      });

      /**
       * @todo I need to find a way to return the error to the user
       */
      if (!response.ok) {
        // throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  const { mutate: removeClient } = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  async function handleDelete(id: number) {
    removeClient(id);
  }

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
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
                onClick={() => handleDelete(client.id!)}
              >
                <Delete />
              </IconButton>
            </>
          }
        >
          <ListItemText
            primary={client.tipo === "PF" ? client.nome : client.nomeFantasia}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default ListClient;
