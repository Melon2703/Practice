import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useAuthContext } from "../hooks/auth";

import { generateLink, getAllLinks, getLink } from "./axios/link";

export const useGenerateLink = () => {
  const navigate = useNavigate();

  const {
    authData: { token },
  } = useAuthContext();

  return useMutation(
    (from: string) => {
      return generateLink(from, token);
    },
    {
      onError: (e: AxiosError) => console.log(e.response?.data?.message),
      onSuccess: (data) => navigate(`/detail/${data.link._id}`),
    }
  );
};

export const useGetLink = (id: string) => {
  const {
    authData: { token },
  } = useAuthContext();

  return useQuery(
    ["link", id],
    () => {
      return getLink(id, token);
    },
    {
      onError: (e: AxiosError) => console.log(e.response?.data?.message),
    }
  );
};

export const useGetAllLinks = () => {
  const {
    authData: { token },
  } = useAuthContext();

  return useQuery(
    "allLinks",
    () => {
      return getAllLinks(token);
    },
    {
      onError: (e: AxiosError) => console.log(e.response?.data?.message),
    }
  );
};
