import { Delete, Edit } from "@mui/icons-material";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { TypeClient } from "../../../types/clientSchema";

interface ClientListItemProps {
  client: TypeClient;
  openDeleteModal: (id: number) => void;
}

const ClientListItem: React.FC<ClientListItemProps> = ({
  client,
  openDeleteModal,
}) => {
  const { id, tipo } = client;
  return (
    <ListItem
      sx={{ borderBottom: "1px solid #ccc" }}
      key={id}
      secondaryAction={
        <>
          <Link to={`/edit-client/${id}`}>
            <IconButton edge="end" aria-label="delete">
              <Edit />
            </IconButton>
          </Link>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => openDeleteModal(id!)}
          >
            <Delete />
          </IconButton>
        </>
      }
    >
      <ListItemText
        primary={tipo === "PF" ? client.nome : client.nomeFantasia}
      />
    </ListItem>
  );
};

export default ClientListItem;
