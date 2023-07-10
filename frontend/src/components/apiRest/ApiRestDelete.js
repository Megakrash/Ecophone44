import api from "./ApiRest";

// -------------------------------------------
// -------------- BACK-OFFICE ----------------
// -------------------------------------------

const deleteEntity = async (entityType, id, updateFunctions) => {
  try {
    const response = await api.delete(`/${entityType}/${id}`);
    updateFunctions.forEach((func) => func());
    return response;
  } catch (error) {
    console.error(`Error delete ${entityType}`);
  }
};

// UpdateBrand.jsx
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

// AdminRepairCard
export const deleteRepair = (repairId, getModelAndRepairs) => {
  return deleteEntity("repair", repairId, [getModelAndRepairs]);
};
