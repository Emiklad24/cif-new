import axios from "axios";
import { apiUrl } from "../constants/apiURL";

const getWard = async (lgaId) => {
  if (lgaId) {
    const res = await axios?.get(`${apiUrl}lookup/wards?lgaId=${lgaId}`);
    
    return res?.data
  }
};

export default getWard;
