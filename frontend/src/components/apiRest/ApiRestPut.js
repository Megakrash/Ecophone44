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
export const updateBrandName = async (brandSelected, newName, getAllBrand) => {
  try {
    const response = await api.put(`/brand/${brandSelected.id}`, {
      name: `${newName}`,
    });
    getAllBrand();
    return response;
  } catch (error) {
    console.error("Name not updated");
  }
};
export const deleteBrandPic = async (brandSelected, getBrandSelected) => {
  try {
    const response = await api.put(`/brandpic_delete/${brandSelected.id}`, {
      pic: `${brandSelected.pic}`,
    });
    getBrandSelected();
    return response;
  } catch (error) {
    console.error("Error delete brand pic");
  }
};
export const uploadNewBrandPic = async (
  brandSelected,
  getBrandSelected,
  data
) => {
  try {
    const response = await api.put(`/brandpic/${brandSelected.id}`, data);
    getBrandSelected();
    return response;
  } catch (error) {
    console.error("Error upload new brand pic");
  }
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
export const updateModelName = async (
  choosenModelId,
  newName,
  getModelAndRepairs,
  getAllModelByBrand,
  setShowUpdateName
) => {
  try {
    const response = await api.put(`/model/${choosenModelId}`, {
      name: `${newName}`,
    });
    getModelAndRepairs();
    getAllModelByBrand();
    setShowUpdateName(false);
    return response;
  } catch (error) {
    console.error("Name not updated");
  }
};

// AdminModelPic.jsx
export const deleteModelPic = async (
  choosenModelId,
  modelPic,
  getModelAndRepairs
) => {
  try {
    const response = await api.put(`/modelpic_delete/${choosenModelId}`, {
      pic: `${modelPic}`,
    });
    getModelAndRepairs();
    return response;
  } catch (error) {
    console.error("Error delete brand pic");
  }
};

export const uploadNewModelPic = async (
  choosenModelId,
  getModelAndRepairs,
  data
) => {
  try {
    const response = await api.put(`/modelpic/${choosenModelId}`, data);
    getModelAndRepairs();
    return response;
  } catch (error) {
    console.error("Error upload new model pic");
  }
};
