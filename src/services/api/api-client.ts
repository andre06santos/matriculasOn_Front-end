import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    method: "GET",
  },
});

const httpClient = ({ endpoint, config }: any) => {
  return axiosInstance(endpoint, config);
};

export { httpClient };
