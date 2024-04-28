import { FC } from "react";
import { Header } from "./Header/";
import { Card, CardContent, Divider, styled } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Main = styled("main")({
  display: "flex",
  justifyContent: "center",
  marginTop: "150px",
});

const Title = styled("h2")({
  textAlign: "center",
});

const Layout: FC<LayoutProps> = ({ children, title }) => {
  return (
    <div>
      <Header />
      <Main>
        <Card sx={{ minWidth: 575, minHeight: 350, padding: "20px 40px" }}>
          <Title>{title}</Title>
          <Divider />
          <CardContent sx={{ marginTop: "20px" }}>{children}</CardContent>
        </Card>
      </Main>
    </div>
  );
};

export default Layout;
