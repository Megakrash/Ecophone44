const express = require("express");

const router = express.Router();
const { verifyToken } = require("../handlers/auth");

const getRoutesFunctions = require("../handlers/getRoutesFunctions");
/* router */
router.get("/", verifyToken, getRoutesFunctions.welcome);

/* users */
router.get("/users", getRoutesFunctions.getUsers);

module.exports = router;
