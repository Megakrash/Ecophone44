const express = require("express");

const router = express.Router();

const refurbRoutesFunctions = require("../handlers/refurbRoutesFunctions");
const { uploadModelPic } = require("./multers/multers");
const { sendReservationEmail } = require("../handlers/nodeMailer");

// -----------------------------------
// ---- Front user no verify token ---
// -----------------------------------
router.get(
  "/api/refurbbyidforfront/:id",
  refurbRoutesFunctions.getRefurbByIdForFront
);
router.post("/api/sendemailreservation", sendReservationEmail);
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
