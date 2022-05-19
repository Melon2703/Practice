import { Button, CircularProgress } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllLinks } from "../api/links";

export const LinksPage = () => {
  const { data, isLoading, isError } = useGetAllLinks();

  const navigate = useNavigate();

  if (isLoading) {
    <CircularProgress />;
  }

  if (isError) {
    <p>Произошла ошибка, обновите страницу</p>;
  }

  return (
    <div>
      <h1>Все ссылки</h1>
      {data?.links.map(({ _id, from, to }) => {
        return (
          <div key={_id}>
            <b>Ссылка</b>: {to} <b>Исходная ссылка</b>: {from}{" "}
            <Button onClick={() => navigate(`/detail/${_id}`)}>Перейти</Button>
          </div>
        );
      })}
    </div>
  );
};
