import { AppBar, Toolbar, styled } from "@mui/material";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import MiddleNav from "./MiddleNav";

const ToolbarWrapper = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

function Header() {
  return (
    <AppBar position="absolute" color="default">
      <ToolbarWrapper>
        <LeftNav />
        <MiddleNav />
        <RightNav />
      </ToolbarWrapper>
    </AppBar>
  );
}

export default Header;
