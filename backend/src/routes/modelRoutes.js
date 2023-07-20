const express = require("express");

const router = express.Router();

const modelRoutesFunctions = require("../handlers/modelRoutesFunctions");
const { uploadModelPic } = require("./multers/multers");

// -----------------------------------
// ---- Front user no verify token ---
// -----------------------------------
router.get(
  "/api/modelbybrandforfront/:id",
  modelRoutesFunctions.getModelByBrandIdForFront
);

// --------------------------------
// ------------ Back-office -------
// --------------------------------
// Add new Model
router.post(
  "/api-token/model",
  uploadModelPic.single("file"),
  modelRoutesFunctions.postNewModel
);
// get by brand Id
router.get(
  "/api-token/modelbybrand/:id",
  modelRoutesFunctions.getModelByBrandId
);
// get by model Id
router.get("/api-token/model/:id", modelRoutesFunctions.getModelById);
// Update model by id
router.put("/api-token/model/:id", modelRoutesFunctions.updateModelById);
// Update Pic in models table then delete pic file
router.put(
  "/api-token/modelpic_delete/:id",
  modelRoutesFunctions.deleteModelPicByModelId
);
// upload new pic file then Update pic in brands
router.put(
  "/api-token/modelpic/:id",
  uploadModelPic.single("file"),
  modelRoutesFunctions.updateModelPicByModelId
);
// Delete the model pic then all repairs link then delete the model
router.delete("/api-token/model/:id", modelRoutesFunctions.deleteModelById);

module.exports = router;
