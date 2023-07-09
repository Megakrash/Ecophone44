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

// -------------------------------------------
// -------------- BACK-OFFICE ----------------
// -------------------------------------------

// UpdateBrand.jsx
export const deleteBrand = async (
  brandSelected,
  setBrandSelected,
  setChoosenBrandId,
  setShowUpdateBrand,
  getAllBrand
) => {
  try {
    const response = await api.delete(`/brand/${brandSelected.id}`);
    setBrandSelected("");
    setChoosenBrandId(0);
    setShowUpdateBrand(false);
    getAllBrand();
    return response;
  } catch (error) {
    console.error("Error delete brand");
  }
};

// AdminDeleteModel.jsx
export const deleteModel = async (
  choosenModelId,
  setChoosenModelId,
  getAllModelByBrand
) => {
  try {
    const response = await api.delete(`/model/${choosenModelId}`);
    setChoosenModelId(0);
    getAllModelByBrand();
    return response;
  } catch (error) {
    console.error("Error delete model");
  }
};

// AdminRepairCard

export const deleteRepair = async (repairId, getModelAndRepairs) => {
  try {
    const response = await api.delete(`/repair/${repairId}`);
    getModelAndRepairs();
    return response;
  } catch (error) {
    console.error("Error delete repair");
  }
};
