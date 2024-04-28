import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Nav } from "./LeftNav";

const NavLinkCustom = styled(NavLink)({
  color: "black",
  textDecoration: "none",
});

function MiddleNav() {
  return (
    <Nav>
      <NavLinkCustom to="/list-client">Listar Clientes</NavLinkCustom>
      <NavLinkCustom to="/add-client">Adicionar Client</NavLinkCustom>
    </Nav>
  );
}
export default MiddleNav;
