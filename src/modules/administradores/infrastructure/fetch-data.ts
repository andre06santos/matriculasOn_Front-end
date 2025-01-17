import { httpClient } from "../../../services/api/api-client";
import { AxiosRequestConfig } from "axios";

const fetchData = async (requestConfig: AxiosRequestConfig) => {
  try {
    const response = await httpClient(requestConfig);

    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export { fetchData };
