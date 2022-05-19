import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../hooks/auth";
import { Button } from "@material-ui/core";

const Links = styled(Box)`
  display: flex;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:first-child {
    margin-right: 8px;
  }
`;

const Menu = styled(Box)`
  display: flex;
`;

const StyledButton = styled(Button)`
  span {
    color: white;
  }
`;

const Toolbar = styled.div`
  display: flex;
  height: 4em;
  align-items: center;
  justify-content: space-between;
`;

const NavBar = () => {
  const { deleteToken } = useAuthContext();

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Menu>
            <Typography sx={{ mr: 10 }} variant="h6" noWrap component="div">
              MERN
            </Typography>
            <Links>
              <MenuItem key="create">
                <StyledLink to="/create">Создать</StyledLink>
              </MenuItem>
              <MenuItem key="links">
                <StyledLink to="/links">Ссылки</StyledLink>
              </MenuItem>
            </Links>
          </Menu>
          <StyledButton onClick={() => deleteToken()}>Выход</StyledButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
