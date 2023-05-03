const express = require("express");
// const { hashPassword } = require("../handlers/auth");

const router = express.Router();

const patchRoutesFunctions = require("../handlers/patchRoutesFunctions");

// Update index_id with D&D
router.put("/brandindex/:id", patchRoutesFunctions.updateBrandById);

// Update Name
router.put("/brandname/:id", patchRoutesFunctions.updateBrandNameById);

module.exports = router;
