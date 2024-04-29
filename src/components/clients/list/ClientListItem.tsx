import { Delete, Edit } from "@mui/icons-material";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { TypeClient, TypePF, TypePJ } from "../../../types/clientSchema";

interface ClientListItemProps {
  client: TypeClient;
  openDeleteModal: (id: number) => void;
}

const isTypePF = (client: TypeClient): client is TypePF => {
  return client.tipo === "PF";
};

const ClientListItem: React.FC<ClientListItemProps> = ({
  client,
  openDeleteModal,
}) => {
  const { id } = client;
  const primaryText = isTypePF(client)
    ? client.nome
    : (client as TypePJ).nomeFantasia;

  return (
    <ListItem
      sx={{ borderBottom: "1px solid #ccc" }}
      key={id}
      secondaryAction={
        <>
          <Link to={`/edit-client/${id}`}>
            <IconButton edge="end" aria-label={`Edit client ${id}`}>
              <Edit />
            </IconButton>
          </Link>
          <IconButton
            edge="end"
            aria-label={`Delete client ${id}`}
            onClick={() => openDeleteModal(id!)}
          >
            <Delete />
          </IconButton>
        </>
      }
    >
      <ListItemText primary={primaryText} />
    </ListItem>
  );
};

export default ClientListItem;
