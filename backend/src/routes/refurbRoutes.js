const express = require("express");

const router = express.Router();

const refurbRoutesFunctions = require("../handlers/refurbRoutesFunctions");
const { uploadModelPic } = require("./multers/multers");

// -----------------------------------
// ---- Front user no verify token ---
// -----------------------------------
router.get(
  "/api/refurbbyidforfront/:id",
  refurbRoutesFunctions.getRefurbByIdForFront
);

router.get("/api/refurbsmodels", refurbRoutesFunctions.getAllRefurbsModels);
// --------------------------------
// ------------ Back-office -------
// --------------------------------
// Add new Model refurb
router.post(
  "/api-token/refurb",
  uploadModelPic.single("file"),
  refurbRoutesFunctions.postNewModelRefurb
);

module.exports = router;
