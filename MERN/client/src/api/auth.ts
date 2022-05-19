import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useAuthContext } from "../hooks/auth";
import { AuthActions } from "../types";
import { auth } from "./axios/auth";

export const useAuth = () => {
  const { setToken } = useAuthContext();

  return useMutation(
    ({ sendData, action }: { sendData: any; action: AuthActions }) => {
      return auth(sendData, action);
    },
    {
      onError: (e: AxiosError) => console.log(e.response?.data?.message),
      onSuccess: (data) => setToken(data.token, data.userId),
    }
  );
};
