import { Input } from "@material-ui/core";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useGenerateLink } from "../api/links";

export const CreatePage = () => {
  const { register, handleSubmit } = useForm();

  const { mutate } = useGenerateLink();

  const onCreate = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSubmit((data) => {
          mutate(data.from);
        })();
      }
    },
    [handleSubmit, mutate]
  );

  return (
    <div>
      <h1>Создание ссылки</h1>
      <Input
        {...register("from")}
        placeholder="Введите ссылку"
        onKeyDown={onCreate}
      />
    </div>
  );
};
