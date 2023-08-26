import api from "./ApiRest";
import { apiRequest, apiRequestPut, deleteEntity } from "./ApiRest";

// -------------------------------------------
// -------------- BACK-OFFICE ----------------
// -------------------------------------------

// AdminManage.jsx
export const getAllModelByBrandAndByType = (
  choosenBrandId,
  setAllModelsByBrand,
  navigate
) =>
  apiRequest(
    "get",
    `/api-token/modelbybrand/${choosenBrandId}`,
    navigate,
    setAllModelsByBrand
  );
// AdminModelsList.jsx
export const updateOrderModel = async (
  items,
  getAllBrand,
  getAllModelByBrand
) => {
  const promises = [];

  items.forEach((element) => {
    const promise = api.put(`/api-token/model/${element.id}`, {
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
// AdminRepairs.jsx
export const updateModelName = (
  choosenModelId,
  newName,
  getModelAndRepairs,
  getAllModelByBrand,
  setShowUpdateName
) =>
  apiRequestPut(
    "put",
    `/api-token/model/${choosenModelId}`,
    { name: newName },
    () => {
      getModelAndRepairs();
      getAllModelByBrand();
      setShowUpdateName(false);
    },
    () => console.error("Name not updated")
  );
// AdminModelPic.jsx
export const deleteModelPic = (choosenModelId, modelPic, getModelAndRepairs) =>
  apiRequestPut(
    "put",
    `/api-token/modelpic_delete/${choosenModelId}`,
    { pic: `${modelPic}` },
    getModelAndRepairs,
    () => console.error("Error delete brand pic")
  );

export const uploadNewModelPic = (choosenModelId, getModelAndRepairs, data) =>
  apiRequestPut(
    "put",
    `/api-token/modelpic/${choosenModelId}`,
    data,
    getModelAndRepairs,
    () => console.error("Error upload new model pic")
  );
// AdminDeleteModel.jsx
export const deleteModel = (
  choosenModelId,
  setChoosenModelId,
  getAllModelByBrand
) => {
  return deleteEntity("model", choosenModelId, [
    () => setChoosenModelId(0),
    getAllModelByBrand,
  ]);
};
// -------------------------------------------
// -------------- FRONT-USER -----------------
// -------------------------------------------

// Model.jsx
export const getAllModelByBrand = (id, setModel, setErrorMessage) => {
  api
    .get(`/api/modelbybrandforfront/${id}`)
    .then((res) => {
      if (!res.data || Object.keys(res.data).length === 0) {
        setErrorMessage(true);
        setModel([]);
      }
      if (!res.data || Object.keys(res.data).length >= 1) {
        setModel(res.data);
        setErrorMessage(false);
      }
    })
    .catch(() => {
      console.error("Error database");
      setErrorMessage(true);
    });
};
