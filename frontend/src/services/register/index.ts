import { api } from "../api";
import { RegisterPostData } from "./register.types";

export const createUser = (data: RegisterPostData) => {
  return api.post("/user", data);
};
