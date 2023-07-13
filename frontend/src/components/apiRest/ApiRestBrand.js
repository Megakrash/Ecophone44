import api from "./ApiRest";
import { apiRequest, apiRequestPut, deleteEntity } from "./ApiRest";

// -------------------------------------------
// -------------- BACK-OFFICE ----------------
// -------------------------------------------
// AdminManage.jsx
export const getAllBrandByType = (type, setBrands, navigate) =>
  apiRequest("get", `/brands/${type}`, navigate, setBrands);

// UpdateBrand.jsx
export const getBrandSelectedById = (choosenBrandId, setBrandSelected) =>
  apiRequest("get", `/brand/${choosenBrandId}`, null, setBrandSelected);

export const updateBrandName = (brandSelected, newName, getAllBrand) =>
  apiRequestPut(
    "put",
    `/brand/${brandSelected.id}`,
    { name: `${newName}` },
    getAllBrand,
    () => console.error("Name not updated")
  );

export const deleteBrandPic = (brandSelected, getBrandSelected) =>
  apiRequestPut(
    "put",
    `/brandpic_delete/${brandSelected.id}`,
    { pic: `${brandSelected.pic}` },
    getBrandSelected,
    () => console.error("Error delete brand pic")
  );

export const uploadNewBrandPic = (brandSelected, getBrandSelected, data) =>
  apiRequestPut(
    "put",
    `/brandpic/${brandSelected.id}`,
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
    const promise = api.put(`/brand/${element.id}`, {
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
export const getAllBrands = (id, setAllBrands) => {
  const brandRoutes = {
    1: "/smartbrands",
    2: "/tabbrands",
    3: "/refurbbrands",
  };
  const url = brandRoutes[id];
  apiRequest("get", url, null, setAllBrands);
};
