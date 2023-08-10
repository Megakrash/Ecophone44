import api from "./ApiRest";
import { apiRequest, deleteEntity } from "./ApiRest";

// -------------------------------------------
// -------------- BACK-OFFICE ----------------
// -------------------------------------------

// AdminManage.jsx
export const getModelAndRepairsByType = async (
  choosenModelId,
  setRepairs,
  setModel,
  navigate
) => {
  try {
    const [allRepairs, getModel] = await Promise.all([
      api.get(`/api-token/repairs/${choosenModelId}`),
      api.get(`/api-token/model/${choosenModelId}`),
    ]);

    setRepairs(allRepairs.data);
    setModel(getModel.data);
  } catch (error) {
    handleError(error, navigate);
  }
};

// AdminRepairsList.jsx
export const getIcons = (setIcons) =>
  apiRequest("get", `/api-token/icons`, null, setIcons);

export const updateOrderRepairs = async (items, getModelAndRepairs) => {
  const promises = [];

  items.forEach((element) => {
    const promise = api.put(`/api-token/repairsindex/${element.id}`, {
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
// AdminRepairCard
export const deleteRepair = (repairId, getModelAndRepairs) => {
  return deleteEntity("repair", repairId, [getModelAndRepairs]);
};
// -------------------------------------------
// -------------- FRONT-USER -----------------
// -------------------------------------------

//Repair.jsx
export const getAllRepairsByModel = (id, setAllRepairs, setErrorMessage) => {
  api
    .get(`/api/repairsforfront/${id}`)
    .then((res) => {
      if (!res.data || Object.keys(res.data).length === 0) {
        setErrorMessage(true);
      }
      setAllRepairs(res.data);
    })
    .catch(() => {
      console.error("Error database");
      setErrorMessage(true);
    });
};
