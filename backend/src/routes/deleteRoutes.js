const express = require("express");

const deleteRoutesFunctions = require("../handlers/deleteRoutesFunctions");

const router = express.Router();

router.delete("/brandpic/:id", deleteRoutesFunctions.deleteBrandPicByBrandId);

module.exports = router;
