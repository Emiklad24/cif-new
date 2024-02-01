import axios from "axios";
import { apiUrl } from "../constants/apiURL";

async function postData(data) {
  try {
    const response = await axios.post(`${apiUrl}cases-integration`, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export default postData;
