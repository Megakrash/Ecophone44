const express = require("express");
const { verifyToken } = require("../handlers/auth");

const deleteRoutes = require("./deleteRoutes");
const getRoutes = require("./getRoutes");
const patchRoutes = require("./patchRoutes");
const postRoutes = require("./postRoutes");

const router = express.Router();

// Use the middleware "verifyToken" for all other routes except "/login"
router.use((req, res, next) => {
  if (req.path === "/login") {
    next();
  } else {
    verifyToken(req, res, next);
  }
});

router.use(deleteRoutes);
router.use(getRoutes);
router.use(patchRoutes);
router.use(postRoutes);

module.exports = router;
