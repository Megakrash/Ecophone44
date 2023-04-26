const express = require("express");
const postRoutesFunctions = require("../handlers/postRoutesFunctions");
const { uploadBrandPic } = require("./multers/multers");
// const { hashPassword, verifyPassword } = require("../handlers/auth");

const router = express.Router();

// Add new Brand
router.post(
  "/brand",
  uploadBrandPic.single("file"),
  postRoutesFunctions.postNewBrand
);
module.exports = router;
