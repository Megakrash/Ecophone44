const express = require("express");
// const { hashPassword } = require("../handlers/auth");

const router = express.Router();

const patchRoutesFunctions = require("../handlers/patchRoutesFunctions");
/* Brand */
// Update brand index_id with D&D
router.put("/brandindex/:id", patchRoutesFunctions.updateBrandIndexById);
// Update Name
router.put("/brandname/:id", patchRoutesFunctions.updateBrandNameById);
// Update Pic for delete pic file
const deleteRoutesFunctions = require("../handlers/deleteRoutesFunctions");

router.put(
  "/brandpic_delete/:id",
  deleteRoutesFunctions.deleteBrandPicByBrandId
);
/* Model */
// Update model index_id with D&D
router.put("/modelindex/:id", patchRoutesFunctions.updateModelIndexById);

module.exports = router;
