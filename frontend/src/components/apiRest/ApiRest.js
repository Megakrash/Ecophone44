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

// Admin.jsx - Function to verify the token
export const verifyToken = (navigate) =>
  apiRequest("get", "/user", navigate, null);

// Helper function to handle errors 401 token
const handleError = (error, navigate) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem("Eco44Token");
    navigate("/login");
  } else {
    console.error("Error Database");
  }
};

// Helper function to handle Api get
export const apiRequest = async (method, url, navigate, setResponseData) => {
  try {
    const response = await api[method](url);
    if (setResponseData) {
      setResponseData(response.data);
    }
    return response;
  } catch (error) {
    handleError(error, navigate);
  }
};
// Helper function to handle Api put
export const apiRequestPut = async (
  method,
  url,
  body,
  onSuccessCallback,
  onErrorCallback
) => {
  try {
    const response = await api[method](url, body);
    onSuccessCallback();
    return response;
  } catch (error) {
    onErrorCallback();
  }
};
// Helper function to handle Api delete
export const deleteEntity = async (entityType, id, updateFunctions) => {
  try {
    const response = await api.delete(`/${entityType}/${id}`);
    updateFunctions.forEach((func) => func());
    return response;
  } catch (error) {
    console.error(`Error delete ${entityType}`);
  }
};
