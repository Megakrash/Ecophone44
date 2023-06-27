const express = require("express");

const router = express.Router();

const getRoutesFunctions = require("../handlers/getRoutesFunctions");
// First verify token
router.get("/user", getRoutesFunctions.getUserToVerifyToken);

// ---- Front user no verify token ---
router.get("/smartbrands", getRoutesFunctions.getSmartBrandsForFront);
router.get("/tabbrands", getRoutesFunctions.getTabBrandsForFront);
router.get("/refurbbrands", getRoutesFunctions.getRefurbBrandsForFront);
router.get(
  "/modelbybrandforfront/:id",
  getRoutesFunctions.getModelByBrandIdForFront
);
router.get(
  "/repairsforfront/:id",
  getRoutesFunctions.getRepairsByModelIdForFront
);
router.get("/calendar", getRoutesFunctions.getCalendarForFront);

// ------------ Back-office -------
// -------------------------------
// ----------- Brands ------------
// -------------------------------
// All brands by type (smartphones / tablets / refurb)
router.get("/brands/:type", getRoutesFunctions.getBrandsByType);
// by Id
router.get("/brand/:id", getRoutesFunctions.getBrandById);

// -------------------------------
// ----------- Models ------------
// -------------------------------
// by brand Id
router.get("/modelbybrand/:id", getRoutesFunctions.getModelByBrandId);
// by model Id
router.get("/model/:id", getRoutesFunctions.getModelById);
// -------------------------------
// ----------- Repairs -----------
// -------------------------------
// by model id
router.get("/repairs/:id", getRoutesFunctions.getRepairsByModelId);
// -------------------------------
// ----------- Icons  ------------
// -------------------------------
router.get("/icons", getRoutesFunctions.getIcons);
module.exports = router;
