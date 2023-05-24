const express = require("express");

const router = express.Router();

const patchRoutesFunctions = require("../handlers/patchRoutesFunctions");

// -------------------------------
// ----------- Brands ------------
// -------------------------------
router.put("/brand/:id", patchRoutesFunctions.updateBrandById);
// Update Pic for delete pic file
const deleteRoutesFunctions = require("../handlers/deleteRoutesFunctions");

router.put(
  "/brandpic_delete/:id",
  deleteRoutesFunctions.deleteBrandPicByBrandId
);
// upload new file then Update pic in brands
const { uploadBrandPic } = require("./multers/multers");

router.put(
  "/brandpic/:id",
  uploadBrandPic.single("file"),
  patchRoutesFunctions.updateBrandPicByBrandId
);

// -------------------------------
// ----------- Models ------------
// -------------------------------
router.put("/model/:id", patchRoutesFunctions.updateModelById);
// Update Pic in models table then delete pic file
router.put(
  "/modelpic_delete/:id",
  deleteRoutesFunctions.deleteModelPicByModelId
);
// upload new pic file then Update pic in brands
const { uploadModelPic } = require("./multers/multers");

router.put(
  "/modelpic/:id",
  uploadModelPic.single("file"),
  patchRoutesFunctions.updateModelPicByModelId
);

// -------------------------------
// ----------- Repairs -----------
// -------------------------------

// Update repair by id
router.put("/repair/:id", patchRoutesFunctions.updateRepairById);
// Update repair index_id with D&D
router.put("/repairsindex/:id", patchRoutesFunctions.updateRepairIndexById);
// Update Is visible
router.put(
  "/repairisvisible/:id",
  patchRoutesFunctions.updateRepairIsVisibleById
);

module.exports = router;
