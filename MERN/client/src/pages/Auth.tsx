import { Button, ButtonGroup, Container, Input } from "@material-ui/core";
import React, { useCallback } from "react";
import { FieldValues, useForm } from "react-hook-form";
import styled from "styled-components";
import { useAuth } from "../api/auth";
import { AuthActions } from "../types";

const StyledContainer = styled(Container)`
  margin: 200px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

export const AuthPage = () => {
  const { register, handleSubmit } = useForm();

  const { mutate } = useAuth();

  const onSubmit = useCallback(
    (action: AuthActions) => async (sendData: FieldValues) => {
      mutate({ sendData, action });
    },
    [mutate]
  );

  return (
    <StyledContainer>
      <form>
        <Inputs>
          <Input
            {...register("email")}
            autoComplete="off"
            autoCapitalize="off"
          />
          <Input
            {...register("password")}
            autoComplete="off"
            autoCapitalize="off"
            type="password"
          />
        </Inputs>

        <ButtonGroup>
          <Button onClick={handleSubmit(onSubmit("login"))}>Вход</Button>
          <Button onClick={handleSubmit(onSubmit("register"))}>
            Регистраци
          </Button>
        </ButtonGroup>
      </form>
    </StyledContainer>
  );
};
