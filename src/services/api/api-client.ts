import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://10.30.2.203:8085/matriculason",
  headers: {
    "Content-Type": "application/json",
  },
});

type HttpClientParams = {
  endpoint: string;
  method: string
  config?: AxiosRequestConfig;
};

const httpClient = ({ endpoint, method, config }: HttpClientParams) => {
  return axiosInstance({
    url: endpoint,
    method: method,
    ...config,
  });
};

export { httpClient };
