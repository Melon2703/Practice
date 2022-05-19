export type AuthActions = "register" | "login";

export interface AuthData {
  token: string;
  userId: string;
}

export interface Link {
  from: string;
  to: string;
  date?: Date;
  code: string;
  clicks?: number;
  owner: string;
  _id: string;
}

export interface LinkResponse {
  link: Link;
}
