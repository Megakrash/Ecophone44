import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_PORT_BACKEND,
});

api.interceptors.request.use(
  function (config) {
    const eco44Token = JSON.parse(localStorage.getItem("Eco44Token"));
    const userToken = eco44Token && eco44Token.userToken;
    config.headers.Authorization = userToken ? `Bearer ${userToken}` : "";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
