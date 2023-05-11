const express = require("express");

const deleteRoutesFunctions = require("../handlers/deleteRoutesFunctions");

const router = express.Router();

/* Brand */
// Delete the pic (patch the name brands table then delete the file)
router.delete("/brandpic/:id", deleteRoutesFunctions.deleteBrandPicByBrandId);
// Delete the brand then all models and repairs link then delete all pic
router.delete("/brand/:id", deleteRoutesFunctions.deleteBrandById);

module.exports = router;
