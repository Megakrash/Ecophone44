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

// Helper function to handle errors 401 token
const handleError = (error, setUserContext, navigate) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem("Eco44Token");
    setUserContext("");
    navigate("/login");
  } else {
    console.error("Error Database");
  }
};

// -------------------------------------------
// -------------- BACK-OFFICE ----------------
// -------------------------------------------

// Admin.jsx
export const verifyToken = async (setUserContext, navigate) => {
  try {
    const response = await api.get("/user");
    setUserContext(JSON.parse(localStorage.getItem("Eco44Token")));
    return response;
  } catch (error) {
    handleError(error, setUserContext, navigate);
  }
};

// AdminManage.jsx
export const getAllBrandByType = async (
  type,
  setBrands,
  setUserContext,
  navigate
) => {
  try {
    const response = await api.get(`/brands/${type}`);
    setBrands(response.data);
    return response;
  } catch (error) {
    handleError(error, setUserContext, navigate);
  }
};

export const getAllModelByBrandAndByType = async (
  choosenBrandId,
  setAllModelsByBrand,
  setUserContext,
  navigate
) => {
  try {
    const response = await api.get(`/modelbybrand/${choosenBrandId}`);
    setAllModelsByBrand(response.data);
    return response;
  } catch (error) {
    handleError(error, setUserContext, navigate);
  }
};

export const getModelAndRepairsByType = async (
  choosenModelId,
  setRepairs,
  setModel,
  setUserContext,
  navigate
) => {
  try {
    const [allRepairs, getModel] = await Promise.all([
      api.get(`/repairs/${choosenModelId}`),
      api.get(`/model/${choosenModelId}`),
    ]);

    setRepairs(allRepairs.data);
    setModel(getModel.data);
  } catch (error) {
    handleError(error, setUserContext, navigate);
  }
};
// UpdateBrand.jsx
export const getBrandSelectedById = async (
  choosenBrandId,
  setBrandSelected
) => {
  try {
    const response = await api.get(`/brand/${choosenBrandId}`);
    setBrandSelected(response.data);
    return response;
  } catch (error) {
    console.error("Error to get the brand selected");
  }
};

// AdminRepairsList.jsx
export const getIcons = async (setIcons) => {
  try {
    const response = await api.get(`/icons`);
    setIcons(response.data);
    return response;
  } catch (error) {
    console.error("Error to get the icons");
  }
};
