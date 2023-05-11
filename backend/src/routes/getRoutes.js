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
// by brand Id
router.get("/modelbybrand/:id", getRoutesFunctions.getModelByBrandId);
// by model Id
router.get("/model/:id", getRoutesFunctions.getModelById);
/* Réparations */
router.get("/repairs/:id", getRoutesFunctions.getRepairsByModelId);

module.exports = router;
