const express = require("express");
// const { hashPassword } = require("../handlers/auth");

const router = express.Router();

const patchRoutesFunctions = require("../handlers/patchRoutesFunctions");
/* Brand */
// Update brand index_id with D&D
router.put("/brandindex/:id", patchRoutesFunctions.updateBrandIndexById);
// Update Name
router.put("/brandname/:id", patchRoutesFunctions.updateBrandNameById);

/* Model */
// Update model index_id with D&D
router.put("/modelindex/:id", patchRoutesFunctions.updateModelIndexById);

module.exports = router;
