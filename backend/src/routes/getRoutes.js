const express = require("express");

const router = express.Router();

const getRoutesFunctions = require("../handlers/getRoutesFunctions");
// First verify token
router.get("/user", getRoutesFunctions.getUserToVerifyToken);

// ------------- Front ------------
router.get("/smartbrands", getRoutesFunctions.getSmartBrandsForFront);
router.get("/tabbrands", getRoutesFunctions.getTabBrandsForFront);
router.get("/refurbbrands", getRoutesFunctions.getRefurbBrandsForFront);

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

module.exports = router;
