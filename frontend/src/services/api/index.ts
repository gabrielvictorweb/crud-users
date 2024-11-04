import axios from "axios";
import secureLS from "../../contants/secure";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = secureLS.get("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Accept"] = "application/json";
  }
  return config;
});
