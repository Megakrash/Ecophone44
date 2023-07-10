import api from "./ApiRest";

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

// Helper function to handle Api requests
const apiRequest = async (
  method,
  url,
  setUserContext,
  navigate,
  setResponseData
) => {
  try {
    const response = await api[method](url);
    if (setResponseData) {
      setResponseData(response.data);
    }
    return response;
  } catch (error) {
    handleError(error, setUserContext, navigate);
  }
};

// -------------------------------------------
// -------------- BACK-OFFICE ----------------
// -------------------------------------------

// Admin.jsx
export const verifyToken = (setUserContext, navigate) =>
  apiRequest("get", "/user", setUserContext, navigate, () => {
    setUserContext(JSON.parse(localStorage.getItem("Eco44Token")));
  });

// AdminManage.jsx
export const getAllBrandByType = (type, setBrands, setUserContext, navigate) =>
  apiRequest("get", `/brands/${type}`, setUserContext, navigate, setBrands);

export const getAllModelByBrandAndByType = (
  choosenBrandId,
  setAllModelsByBrand,
  setUserContext,
  navigate
) =>
  apiRequest(
    "get",
    `/modelbybrand/${choosenBrandId}`,
    setUserContext,
    navigate,
    setAllModelsByBrand
  );

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
export const getBrandSelectedById = (choosenBrandId, setBrandSelected) =>
  apiRequest("get", `/brand/${choosenBrandId}`, null, null, setBrandSelected);

// AdminRepairsList.jsx
export const getIcons = (setIcons) =>
  apiRequest("get", `/icons`, null, null, setIcons);

// -------------------------------------------
// -------------- FRONT-USER -----------------
// -------------------------------------------
// Brand.jsx
export const getAllBrands = (id, setAllBrands) => {
  const brandRoutes = {
    1: "/smartbrands",
    2: "/tabbrands",
    3: "/refurbbrands",
  };
  const url = brandRoutes[id];
  apiRequest("get", url, null, null, setAllBrands);
};
// Model.jsx
export const getAllModelByBrand = (id, setModel) =>
  apiRequest("get", `/modelbybrandforfront/${id}`, null, null, setModel);
//Repair.jsx
export const getAllRepairsByModel = (id, setAllRepairs) =>
  apiRequest("get", `/repairsforfront/${id}`, null, null, setAllRepairs);
//Refurb.jsx
export const getRefurbById = (id, setDetails) =>
  apiRequest("get", `/refurbbyidforfront/${id}`, null, null, setDetails);
