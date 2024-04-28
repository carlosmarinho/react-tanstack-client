import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { TypeClient } from "../../../types/clientSchema";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, List, ListItem, ListItemText } from "@mui/material";

function ListClient() {
  //   const [clients, setClients] = useState<Client[]>([]);

  const fetchClients = useCallback(async () => {
    const response = await fetch("/api/clients");
    return (await response.json()) as TypeClient[];
  }, []);

  //   useEffect(() => {
  //     fetchClients();
  //   }, [fetchClients]);

  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  async function handleDelete(id: number) {
    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        // throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
              <IconButton edge="end" aria-label="delete">
                <Edit />
              </IconButton>
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
