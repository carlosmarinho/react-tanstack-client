import { Typography, styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Nav } from "./LeftNav";

import { useClient } from "../../../hooks/clientHooks";
import { gnerateFakeClientsToSessionStorage } from "../../../utils/storageUtils";

const NavLinkCustom = styled(NavLink)({
  color: "black",
  textDecoration: "none",
});

function MiddleNav() {
  const { refetch } = useClient();

  const handleLoadFakeClient = () => {
    gnerateFakeClientsToSessionStorage();
    refetch();
  };

  return (
    <Nav>
      <NavLinkCustom to="/list-client">
        <Typography>Listar Clientes</Typography>
      </NavLinkCustom>
      <NavLinkCustom to="/add-client">
        <Typography>Adicionar Cliente</Typography>
      </NavLinkCustom>
      <NavLinkCustom onClick={handleLoadFakeClient}>
        <Typography>Load fake Clientes</Typography>
      </NavLinkCustom>
    </Nav>
  );
}
export default MiddleNav;
