import axios from "axios";
import { apiUrl } from "../constants/apiURL";

const getAllLookups = async () => {
  const res = await axios?.get(
    `${apiUrl}all-look-ups`
  );

  return res?.data;
};

export default getAllLookups;
