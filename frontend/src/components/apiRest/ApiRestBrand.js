import api from "./ApiRest";
import { apiRequest, apiRequestPut, deleteEntity } from "./ApiRest";

// -------------------------------------------
// -------------- BACK-OFFICE ----------------
// -------------------------------------------
// AdminManage.jsx
export const getAllBrandByType = (type, setBrands, navigate) =>
  apiRequest("get", `/api-token/brands/${type}`, navigate, setBrands);

// UpdateBrand.jsx
export const getBrandSelectedById = (choosenBrandId, setBrandSelected) =>
  apiRequest(
    "get",
    `/api-token/brand/${choosenBrandId}`,
    null,
    setBrandSelected
  );

export const updateBrandName = (brandSelected, newName, getAllBrand) =>
  apiRequestPut(
    "put",
    `/api-token/brand/${brandSelected.id}`,
    { name: `${newName}` },
    getAllBrand,
    () => console.error("Name not updated")
  );

export const deleteBrandPic = (brandSelected, getBrandSelected) =>
  apiRequestPut(
    "put",
    `/api-token/brandpic_delete/${brandSelected.id}`,
    { pic: `${brandSelected.pic}` },
    getBrandSelected,
    () => console.error("Error delete brand pic")
  );

export const uploadNewBrandPic = (brandSelected, getBrandSelected, data) =>
  apiRequestPut(
    "put",
    `/api-token/brandpic/${brandSelected.id}`,
    data,
    getBrandSelected,
    () => console.error("Error upload new brand pic")
  );

export const deleteBrand = (
  brandSelected,
  setBrandSelected,
  setChoosenBrandId,
  setShowUpdateBrand,
  getAllBrand
) => {
  return deleteEntity("brand", brandSelected.id, [
    () => setBrandSelected(""),
    () => setChoosenBrandId(0),
    () => setShowUpdateBrand(false),
    getAllBrand,
  ]);
};

// AdminBrandsList.jsx
export const updateOrderBrand = async (items, getAllBrand) => {
  const promises = [];

  items.forEach((element) => {
    const promise = api.put(`/api-token/brand/${element.id}`, {
      indexId: `${element.index_id}`,
    });
    promises.push(promise);
  });

  return Promise.all(promises)
    .then(() => {
      getAllBrand();
    })
    .catch((err) => console.error(err));
};

// -------------------------------------------
// -------------- FRONT-USER -----------------
// -------------------------------------------
// Brand.jsx
export const getAllBrands = (id, setAllBrands, setErrorMessage) => {
  const brandRoutes = {
    1: "/api/smartbrands",
    2: "/api/tabbrands",
    3: "/api/refurbbrands",
  };
  const url = brandRoutes[id];
  api
    .get(`${url}`)
    .then((res) => {
      if (!res.data || Object.keys(res.data).length === 0) {
        setErrorMessage(true);
      }
      setAllBrands(res.data);
    })
    .catch(() => {
      console.error("Error database");
      setErrorMessage(true);
    });
};
