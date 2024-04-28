import { Typography, styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Nav } from "./LeftNav";

const NavLinkCustom = styled(NavLink)({
  color: "black",
  textDecoration: "none",
});

function MiddleNav() {
  const handleLoadFakeClient = () => {};

  return (
    <Nav>
      <NavLinkCustom to="/list-client">
        <Typography>Listar Clientes</Typography>
      </NavLinkCustom>
      <NavLinkCustom to="/add-client">
        <Typography>Adicionar Cliente</Typography>
      </NavLinkCustom>
      <Typography onClick={handleLoadFakeClient}>Load fake Clientes</Typography>
    </Nav>
  );
}
export default MiddleNav;
