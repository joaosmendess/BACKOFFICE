import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Drawer } from "@mui/material";
import { Icon } from "@iconify/react";
import DrawerContent from "../DrawerContent";
import { styled } from "@stitches/react";
import { Link, useLocation } from "react-router-dom";

const StyledAppBar = styled(AppBar, {
  backgroundColor: "$primary",
});

const TitleContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  "@media (min-width: 600px)": {
    flexDirection: "row",
    alignItems: "center",
  },
});

const SubTitle = styled("span", {
  fontSize: "13px",
  marginTop: "5px",
  "@media (min-width: 600px)": {
    marginTop: "0",
    marginLeft: "10px",
  },
});

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const [title, setTitle] = useState("");

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setTitle("");
        break;
      case "/aplicacao-permissao/gerenciar":
        setTitle("Gerenciar Aplicação para Permissão");
        break;
      case "/aplicacao-permissao/lista":
        setTitle("Lista de Aplicações para Permissão");
        break;
      case "/aplicacao-permissao/editar":
        setTitle("Editar Lista de Aplicações para Permissão");
        break;
      case "/empresa/gerenciar":
        setTitle("Gerenciar empresa");
        break;
      case "/empresa/lista":
        setTitle("Lista de empresa");
        break;
      case "/modulos/gerenciar":
        setTitle("Gerenciar módulo para permissão");
        break;
      case "/modulos/lista":
        setTitle("Lista de módulos para permissão");
        break;
      case "/modulos/editar":
        setTitle("Editar Lista de módulos ");
        break;
      default:
        setTitle("");
    }
  }, [location.pathname]);

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <TitleContainer>
            <Typography variant="h6" component="div">
              <Link to="/" style={{ textDecoration: "none", color: "#FFFF" }}>
                OFM Backoffice
              </Link>
            </Typography>
            <SubTitle>{title}</SubTitle>
          </TitleContainer>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <Icon icon="mdi:menu" />
          </IconButton>
        </Toolbar>
      </StyledAppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <DrawerContent toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
};

export default Header;
