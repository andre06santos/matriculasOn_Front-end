import { httpClient } from "../../../services/api/api-client";
import { AxiosRequestConfig } from "axios";

type FetchDataConfig = {
  endpoint: string;
  config?: AxiosRequestConfig;
};

const fetchData = async (requestConfig: FetchDataConfig) => {
  try {
    const { endpoint, config } = requestConfig;

    if (!endpoint) {
      throw new Error("Endpoint (URL) não foi especificado.");
    }

    // Enviando o objeto com a estrutura correta para httpClient
    const response = await httpClient({
      endpoint,
      config, // Passando a configuração extra (opcional) para o httpClient
    });

    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export { fetchData };
