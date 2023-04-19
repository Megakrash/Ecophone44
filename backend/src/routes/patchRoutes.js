const express = require("express");
// const { hashPassword } = require("../handlers/auth");

const router = express.Router();

const patchRoutesFunctions = require("../handlers/patchRoutesFunctions");

router.patch("/videos/:id", patchRoutesFunctions.patchVideoById);

module.exports = router;
