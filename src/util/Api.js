import axios from "axios";
import Cookies from "js-cookie";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 60_000,
});

// pick the token from the cookie and set it in the header
httpClient.interceptors.request.use(
  (config) => {
    const access = Cookies.get("enlis_token") ?? null;
    const user = access ? JSON.parse(access) : null;

    // Set authorization token
    if (access && user) {
      config.headers.Authorization = `Bearer ${user}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export { httpClient };
