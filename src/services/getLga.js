import axios from "axios";
import { apiUrl } from "../constants/apiURL";

const getLga = async (stateId) => {
  const res = await axios?.get(`${apiUrl}lookup/lgas?stateId=${stateId}`);



  return res?.data?.[stateId];
};

export default getLga;
