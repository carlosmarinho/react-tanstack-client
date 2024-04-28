import { Box, Typography, styled } from "@mui/material";
import Logo from "../../../assets/images/logo.png";

const LogoWrapper = styled(Box)({
  width: "45px",
  height: "45px",
  marginRight: "10px",
});

export const Nav = styled(Box)(({ left }) => ({
  display: "flex",
  gap: left ? "5px" : "20px",
}));

const LogoText = styled(Typography)({
  fontSize: "18px",
  fontWeight: "bold",
  alignSelf: "center",
  marginLeft: "0",
});

function LeftNav() {
  return (
    <Nav left>
      <LogoWrapper component="img" src={Logo} alt="Logo My Clients" />
      <LogoText variant="h1" color="inherit" noWrap>
        My Clients
      </LogoText>
    </Nav>
  );
}

export default LeftNav;
