const express = require("express");
const { verifyToken } = require("../handlers/auth");

const deleteRoutes = require("./deleteRoutes");
const getRoutes = require("./getRoutes");
const patchRoutes = require("./patchRoutes");
const postRoutes = require("./postRoutes");

const router = express.Router();

// Use the middleware "verifyToken" for all routes except "/login" & front-user path
router.use((req, res, next) => {
  const { path } = req;
  if (
    path === "/login" ||
    path === "/smartbrands" ||
    path === "/tabbrands" ||
    path === "/refurbbrands" ||
    path === "/calendar" ||
    path.startsWith("/modelbybrandforfront/") ||
    path.startsWith("/repairsforfront/")
  ) {
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
