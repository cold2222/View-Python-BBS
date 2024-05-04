import axiosInstance from "@/api/axiosInstance/axiosInstance";
import cookies from "vue-cookies";

axiosInstance.interceptors.request.use(function (config) {
  if (cookies.get("user_jwt") !== null)
    config.headers.Authorization = `Bearer ${cookies.get("user_jwt")}`;
  return config;
});

const axiosGateway = axiosInstance;

export default axiosGateway;
