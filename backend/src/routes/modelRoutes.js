const express = require("express");

const router = express.Router();

const modelRoutesFunctions = require("../handlers/modelRoutesFunctions");
const { uploadModelPic } = require("./multers/multers");

// -----------------------------------
// ---- Front user no verify token ---
// -----------------------------------
router.get(
  "/modelbybrandforfront/:id",
  modelRoutesFunctions.getModelByBrandIdForFront
);

// --------------------------------
// ------------ Back-office -------
// --------------------------------
// Add new Model
router.post(
  "/model",
  uploadModelPic.single("file"),
  modelRoutesFunctions.postNewModel
);
// get by brand Id
router.get("/modelbybrand/:id", modelRoutesFunctions.getModelByBrandId);
// get by model Id
router.get("/model/:id", modelRoutesFunctions.getModelById);
// Update model by id
router.put("/model/:id", modelRoutesFunctions.updateModelById);
// Update Pic in models table then delete pic file
router.put(
  "/modelpic_delete/:id",
  modelRoutesFunctions.deleteModelPicByModelId
);
// upload new pic file then Update pic in brands
router.put(
  "/modelpic/:id",
  uploadModelPic.single("file"),
  modelRoutesFunctions.updateModelPicByModelId
);
// Delete the model pic then all repairs link then delete the model
router.delete("/model/:id", modelRoutesFunctions.deleteModelById);

module.exports = router;
