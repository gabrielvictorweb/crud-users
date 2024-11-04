import { api } from "../api";
import { ResponseSignIn, SignInProps } from "./auth.types";

export const signIn = (data: SignInProps) => {
  return api.post<ResponseSignIn>("/auth", data);
};
