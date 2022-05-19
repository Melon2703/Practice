import { Container } from "@material-ui/core";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";

// import styled from "styled-components";
import { Routes } from "./components/Routes";
import { AuthProvider, useAuthContext } from "./hooks/auth";

const queryClient = new QueryClient();

const Provider = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

const App = () => {
  const { isAuth } = useAuthContext();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {isAuth && <NavBar />}
        <Container>
          <Routes isAuth={isAuth} />
        </Container>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default Provider;
