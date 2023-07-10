import api from "./ApiRest";

const apiRequest = async (
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

// const apiRequestMultiple = async (
//   items,
//   url,
//   field,
//   onSuccessCallback,
//   onErrorCallback
// ) => {
//   const promises = items.map((item) =>
//     api.put(`${url}/${item.id}`, {
//       [field]: `${item[field]}`,
//     })
//   );

//   return Promise.all(promises).then(onSuccessCallback).catch(onErrorCallback);
// };

// -------------------------------------------
// -------------- BACK-OFFICE ----------------
// -------------------------------------------

// UpdateBrand.jsx
export const updateBrandName = (brandSelected, newName, getAllBrand) =>
  apiRequest(
    "put",
    `/brand/${brandSelected.id}`,
    { name: `${newName}` },
    getAllBrand,
    () => console.error("Name not updated")
  );

export const deleteBrandPic = (brandSelected, getBrandSelected) =>
  apiRequest(
    "put",
    `/brandpic_delete/${brandSelected.id}`,
    { pic: `${brandSelected.pic}` },
    getBrandSelected,
    () => console.error("Error delete brand pic")
  );

export const uploadNewBrandPic = (brandSelected, getBrandSelected, data) =>
  apiRequest(
    "put",
    `/brandpic/${brandSelected.id}`,
    data,
    getBrandSelected,
    () => console.error("Error upload new brand pic")
  );

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

// AdminModelsList.jsx
export const updateOrderModel = async (
  items,
  getAllBrand,
  getAllModelByBrand
) => {
  const promises = [];

  items.forEach((element) => {
    const promise = api.put(`/model/${element.id}`, {
      indexId: `${element.index_id}`,
    });
    promises.push(promise);
  });

  return Promise.all(promises)
    .then(() => {
      getAllBrand();
      getAllModelByBrand();
    })
    .catch((err) => console.error(err));
};

// AdminRepairsList.jsx
export const updateOrderRepairs = async (items, getModelAndRepairs) => {
  const promises = [];

  items.forEach((element) => {
    const promise = api.put(`/repairsindex/${element.id}`, {
      indexId: `${element.index_id}`,
    });
    promises.push(promise);
  });

  return Promise.all(promises)
    .then(() => {
      getModelAndRepairs();
    })
    .catch((err) => console.error(err));
};

// AdminRepairs.jsx
export const updateModelName = (
  choosenModelId,
  newName,
  getModelAndRepairs,
  getAllModelByBrand,
  setShowUpdateName
) =>
  apiRequest(
    "put",
    `/model/${choosenModelId}`,
    { name: `${newName}` },
    () => {
      getModelAndRepairs();
      getAllModelByBrand();
      setShowUpdateName(false);
    },
    () => console.error("Name not updated")
  );

// AdminModelPic.jsx
export const deleteModelPic = (choosenModelId, modelPic, getModelAndRepairs) =>
  apiRequest(
    "put",
    `/modelpic_delete/${choosenModelId}`,
    { pic: `${modelPic}` },
    getModelAndRepairs,
    () => console.error("Error delete brand pic")
  );

export const uploadNewModelPic = (choosenModelId, getModelAndRepairs, data) =>
  apiRequest(
    "put",
    `/modelpic/${choosenModelId}`,
    data,
    getModelAndRepairs,
    () => console.error("Error upload new model pic")
  );
