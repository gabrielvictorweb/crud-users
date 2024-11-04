import { api } from "../api";
import { MeProps, UserUpdateRequest } from "./user.types";

export const getMe = (): Promise<MeProps> => {
  return api.get("/user/me").then((response) => response.data);
};

export const updateUser = (data: UserUpdateRequest) => {
  return api.patch("/user", data);
};
