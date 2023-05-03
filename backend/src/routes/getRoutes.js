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
router.get("/model/:id", getRoutesFunctions.getModelByBrandId);

/* Réparations */
router.get("/reparation/:id", getRoutesFunctions.getReparationByModelId);

module.exports = router;
