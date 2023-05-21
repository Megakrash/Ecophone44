const express = require("express");
const postRoutesFunctions = require("../handlers/postRoutesFunctions");
const { uploadBrandPic, uploadModelPic } = require("./multers/multers");
const { verifyPassword, verifyToken } = require("../handlers/auth");

const router = express.Router();

// LOGIN
router.post(
  "/login",
  postRoutesFunctions.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// Use the middleware "verifyToken" for each router.post
router.use(verifyToken);

// -------------------------------
// ----------- Brands ------------
// -------------------------------
// Add new Brand
router.post(
  "/brand",
  uploadBrandPic.single("file"),
  postRoutesFunctions.postNewBrand
);
// -------------------------------
// ----------- Models ------------
// -------------------------------
// Add new Model
router.post(
  "/model",
  uploadModelPic.single("file"),
  postRoutesFunctions.postNewModel
);

// -------------------------------
// ----------- Repairs -----------
// -------------------------------
// Add new repair
router.post("/repair", postRoutesFunctions.postNewRepair);

module.exports = router;
