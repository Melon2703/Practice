import axios from "axios";
import { AuthActions, AuthData } from "../../types";

const instance = axios.create({
  baseURL: "/api/auth/",
  headers: {
    "content-type": "application/json",
  },
  timeout: 1000,
});

export const auth = async (sendData: any, action: AuthActions) => {
  const { data } = await instance.post<AuthData>(
    action,
    JSON.stringify(sendData)
  );

  return data;
};
