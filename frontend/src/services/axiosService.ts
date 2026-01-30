import axios from "axios";
import {StorageKeys} from "../lib/enums/StorageKeys.ts";
import { Envs } from "../lib/envs.ts";

const createInstance = () => {
  const authToken = localStorage.getItem(StorageKeys.AUTH_TOKEN);

  return axios.create({
    baseURL: Envs.apiUrl,
    timeout: 1000,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + authToken
    },
  })
}


export default createInstance();