import axios from "axios";
import { Link, LinkResponse } from "../../types";

const instance = axios.create({
  baseURL: "/api/links/",
  headers: {
    "content-type": "application/json",
  },
  timeout: 1000,
});

export const generateLink = async (from: string, token: string) => {
  const { data } = await instance.post<LinkResponse>(
    "generate",
    JSON.stringify({ from }),
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return data;
};

export const getLink = async (id: string, token: string) => {
  const { data } = await instance.get<LinkResponse>(id, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getAllLinks = async (token: string) => {
  const { data } = await instance.get<{ links: Link[] }>("all", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
