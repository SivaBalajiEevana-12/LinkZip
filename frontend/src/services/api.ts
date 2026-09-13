import axios from "axios";

export const api = axios.create({
  baseURL: " https://linkzip-2.onrender.com/api",
  withCredentials: true,
});
export const publicApi = axios.create({
  baseURL: "https://linkzip-2.onrender.com",
  withCredentials: true,
});