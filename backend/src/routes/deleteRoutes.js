const express = require("express");

const deleteRoutesFunctions = require("../handlers/deleteRoutesFunctions");

const router = express.Router();

// -------------------------------
// ----------- Brands ------------
// -------------------------------
// Delete the pic (patch the name brands table then delete the file)
router.delete("/brandpic/:id", deleteRoutesFunctions.deleteBrandPicByBrandId);
// Delete the brand then all models and repairs link then delete all pic
router.delete("/brand/:id", deleteRoutesFunctions.deleteBrandById);

// -------------------------------
// ----------- Repairs -----------
// -------------------------------

// Delete the repair by id
router.delete("/repair/:id", deleteRoutesFunctions.deleteRepairById);

module.exports = router;
