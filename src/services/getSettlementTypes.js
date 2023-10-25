import axios from "axios";
import { apiUrl } from "../constants/apiURL";

const getSettlementType = async () => {
  const res = await axios?.get(`${apiUrl}settlement-type`);

  return res?.data;
};

export default getSettlementType;
