import axios from "axios";
import { identity, pickBy } from "lodash";

const API_URL = "http://localhost:5050/";

const CreateProductionData = async (data) => {
  try {
    const res = await axios.post(API_URL + "production", data);
    return res;
  } catch (error) {
    return error;
  }
};
const getProductionData = async (query) => {
  const params = new URLSearchParams(pickBy(query, identity));

  try {
    const res = await axios.get(API_URL + "production", { params });
    return res;
  } catch (error) {
    return error;
  }
};

export { CreateProductionData, getProductionData };
