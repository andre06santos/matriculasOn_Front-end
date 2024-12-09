import { httpClient } from "../../../services/api/api-client";

const fetchData = async (requestConfig: any) => {
  try {
    const response = await httpClient(requestConfig);

    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export { fetchData };
