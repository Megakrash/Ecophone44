const express = require("express");

const deleteRoutesFunctions = require("../handlers/deleteRoutesFunctions");
const { verifyToken } = require("../handlers/auth");

const router = express.Router();

// Use the middleware "verifyToken" for each router.delete
router.use(verifyToken);

// -------------------------------
// ----------- Brands ------------
// -------------------------------

// Delete the brand then all models and repairs link then delete all pic
router.delete("/brand/:id", deleteRoutesFunctions.deleteBrandById);

// -------------------------------
// ----------- Models ------------
// -------------------------------
// Delete the model pic then all repairs link then delete the model
router.delete("/model/:id", deleteRoutesFunctions.deleteModelById);

// -------------------------------
// ----------- Repairs -----------
// -------------------------------

// Delete the repair by id
router.delete("/repair/:id", deleteRoutesFunctions.deleteRepairById);

module.exports = router;
