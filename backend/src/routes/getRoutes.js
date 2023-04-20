const express = require("express");

const router = express.Router();
// const { verifyToken } = require("../handlers/auth");

const getRoutesFunctions = require("../handlers/getRoutesFunctions");
/* router */
// router.get("/", verifyToken, getRoutesFunctions.welcome);

/* Brand */
router.get("/brand", getRoutesFunctions.getBrand);

/* Model */
router.get("/model/:id", getRoutesFunctions.getModelByBrandId);

/* Réparations */
router.get("/reparation/:id", getRoutesFunctions.getReparationByModelId);

module.exports = router;
