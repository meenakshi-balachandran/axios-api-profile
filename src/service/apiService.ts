import axios from "axios";
import { ACCESS_TOKEN } from "../utils/constants";

const baseUrl = "https://iassistant.ideas2it.com/";

const header = {
  "Content-Type": "application/x-www-form-urlencoded",
};
const apiService = axios.create({
  baseURL: baseUrl,
  headers: header,
});

apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token && !config.url?.includes("/api/auth/authenticate")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (respone) => {
    return respone;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(ACCESS_TOKEN);
    }
    return Promise.reject(new Error("INVALID USERNAME AND PASSWORD"));
  }
);

export default apiService;
