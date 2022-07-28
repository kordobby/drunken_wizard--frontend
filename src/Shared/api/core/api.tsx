import axios from "axios";
import { getCookie } from "../../Cookies";

/* axios instance */
const API_URL = process.env.REACT_APP_API_URL;
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  // 요청 성공 직전 호출
  // axios 설정값 넣음
  (config: any) => {
    const token = getCookie("token");
    config.headers.Authorization = token;
    return config;
  },
  // 요청 에러 직전 호출
  (error) => {
    // console.log(error);
  }
);

export default api;
