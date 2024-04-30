import axios from "axios";
import { apiUrl } from "../constants/apiURL";

const getAllLookups = async () => {
  try {
    const response = await axios.get(`${apiUrl}lookup/all-look-ups`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export default getAllLookups;