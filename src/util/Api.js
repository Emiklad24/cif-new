import axios from "axios";
import Cookies from "js-cookie";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 60_000,
  headers: {
    // Overwrite Axios's automatically set Content-Type
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});
export { httpClient };

