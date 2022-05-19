import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetLink } from "../api/links";

export const DetailPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetLink(id as string);

  if (isLoading) {
    <CircularProgress />;
  }

  if (isError) {
    <p>Произошла ошибка, обновите страницу</p>;
  }

  return (
    <div>
      <p>
        <b>Ссылка</b>:{" "}
        <a href={data?.link.to} target="_blank" rel="noopener noreferrer">
          {data?.link.to}
        </a>
      </p>
      <p>
        Исходная ссылка:{" "}
        <a href={data?.link.from} target="_blank" rel="noopener noreferrer">
          {data?.link.from}
        </a>
      </p>
      <p>Счетчик: {data?.link.clicks}</p>
      <p>Дата: {data?.link.date}</p>
    </div>
  );
};
