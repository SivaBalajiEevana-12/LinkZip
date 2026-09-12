import axios from "axios";

export const api = axios.create({
  baseURL: "https://server-iota-two-26.vercel.app/api",
  withCredentials: true,
});
export const publicApi = axios.create({
  baseURL: "https://server-iota-two-26.vercel.app",
  withCredentials: true,
});