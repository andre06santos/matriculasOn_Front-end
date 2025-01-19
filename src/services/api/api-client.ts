import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    method: "GET",
  },
});

type HttpClientParams = {
  endpoint: string;
  config?: AxiosRequestConfig;
};

const httpClient = ({ endpoint, config }: HttpClientParams) => {
  return axiosInstance(endpoint, config);
};

export { httpClient };
