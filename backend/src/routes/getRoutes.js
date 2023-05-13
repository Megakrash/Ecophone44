const express = require("express");

const router = express.Router();
// const { verifyToken } = require("../handlers/auth");

const getRoutesFunctions = require("../handlers/getRoutesFunctions");

/* Brand */
// smartphone
router.get("/smartbrand", getRoutesFunctions.getSmartBrand);
// tablet
router.get("/tabbrand", getRoutesFunctions.getTabBrand);
// by Id
router.get("/brand/:id", getRoutesFunctions.getBrandById);

/* Model */
// by brand Id for back-office
router.get("/modelbybrand/:id", getRoutesFunctions.getModelByBrandId);
// by brand Id for front
router.get("/model_front/:id", getRoutesFunctions.getModelByBrandIdForFront);
// by model Id
router.get("/model/:id", getRoutesFunctions.getModelById);
/* Réparations */
// by model id for back-office
router.get("/repairs/:id", getRoutesFunctions.getRepairsByModelId);
// by model id for back-office
router.get(
  "/repairs_front/:id",
  getRoutesFunctions.getRepairsByModelIdForFront
);

module.exports = router;
