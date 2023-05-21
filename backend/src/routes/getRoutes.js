const express = require("express");

const router = express.Router();
// const { verifyToken } = require("../handlers/auth");

const getRoutesFunctions = require("../handlers/getRoutesFunctions");

// -------------------------------
// ----------- Brands ------------
// -------------------------------
// smartphone
router.get("/smartbrand", getRoutesFunctions.getSmartBrand);
// tablet
router.get("/tabbrand", getRoutesFunctions.getTabBrand);
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
// by model id
router.get(
  "/repairs_front/:id",
  getRoutesFunctions.getRepairsByModelIdForFront
);

module.exports = router;
