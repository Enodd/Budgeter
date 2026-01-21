import axios from "axios";
import { Envs } from "../lib/envs";

const instance = axios.create({
  baseURL: Envs.apiUrl,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(async function(config) {
  const methodsToRefresh = ['post', 'put', 'patch', 'delete'];

  if (methodsToRefresh.includes(config.method?.toLowerCase() ?? 'unknown')) {
    // TODO: add refresh token logic on post, put, delete
  }

  return config;
})


export default instance;