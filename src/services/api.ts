import axios from "axios";

import {
  getAccessToken,
} from "../auth/getAccessToken";

const api = axios.create({
  baseURL: "https://localhost:7201/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(

  async (config) => {

    try {

      const token =
        await getAccessToken();

      config.headers.Authorization =
        `Bearer ${token}`;

    } catch {

      console.log(
        "User not authenticated"
      );
    }

    return config;
  }
);

export default api;