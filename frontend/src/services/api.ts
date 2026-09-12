import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
export const publicApi = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});