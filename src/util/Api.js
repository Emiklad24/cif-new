import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 60_000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});


export { httpClient };

