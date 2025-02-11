import axios from "axios"
import { HOSTURL } from "./constant.js";

export const AxiosApiClient = axios.create({
    baseURL: HOSTURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
