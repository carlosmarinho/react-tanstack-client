import { Divider, Typography } from "@mui/material";
import { Nav } from "./LeftNav";

function RightNav() {
  return (
    <Nav>
      <Typography color="inherit" noWrap>
        Seja bem vindo Admin!
      </Typography>
      <Divider orientation="vertical" flexItem />
      <Typography color="inherit" noWrap>
        Sair
      </Typography>
    </Nav>
  );
}

export default RightNav;
