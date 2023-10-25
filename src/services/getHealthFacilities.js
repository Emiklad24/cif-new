import axios from "axios";
import { apiUrl } from "../constants/apiURL";

const getHealthFacilities = async () => {
  const res = await axios?.get(`${apiUrl}health-facilities`);
  return res?.data?.All;
};

export default getHealthFacilities;
