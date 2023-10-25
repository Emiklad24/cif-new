import axios from "axios";
import { apiUrl } from "../constants/apiURL";

const getAllStates = async () => {
  const res = await axios?.get(`${apiUrl}states`);

  
  return res?.data;
};

export default getAllStates;
