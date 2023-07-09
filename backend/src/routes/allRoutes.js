const express = require("express");
const { verifyToken } = require("../handlers/auth");

const deleteRoutes = require("./deleteRoutes");
const getRoutes = require("./getRoutes");
const patchRoutes = require("./patchRoutes");
const postRoutes = require("./postRoutes");

const router = express.Router();

// Use the middleware "verifyToken" for all routes except "/login" & front-user path
router.use((req, res, next) => {
  const { path, method } = req;
  const unauthenticatedPaths = ["/smartbrands", "/tabbrands", "/refurbbrands"];

  const unauthenticatedPathsForGetAndPost = [
    "/login",
    "/calendar",
    "/sendemailreservation",
  ];

  const unauthenticatedPrefixes = [
    "/refurbbyidforfront",
    "/modelbybrandforfront/",
    "/repairsforfront/",
  ];

  const isUnauthenticatedPath =
    unauthenticatedPaths.includes(path) ||
    unauthenticatedPrefixes.some((prefix) => path.startsWith(prefix));

  const isUnauthenticatedPathForGetAndPost =
    unauthenticatedPathsForGetAndPost.includes(path);

  if (
    (isUnauthenticatedPath && method === "GET") ||
    (isUnauthenticatedPathForGetAndPost &&
      (method === "GET" || method === "POST"))
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
