const express = require("express");

const router = express.Router();

const refurbRoutesFunctions = require("../handlers/refurbRoutesFunctions");
const { uploadModelPic } = require("./multers/multers");
const { sendReservationEmail } = require("../handlers/nodeMailer");

// -----------------------------------
// ---- Front user no verify token ---
// -----------------------------------
router.get(
  "/refurbbyidforfront/:id",
  refurbRoutesFunctions.getRefurbByIdForFront
);
router.post("/sendemailreservation", sendReservationEmail);
// --------------------------------
// ------------ Back-office -------
// --------------------------------
// Add new Model refurb
router.post(
  "/refurb",
  uploadModelPic.single("file"),
  refurbRoutesFunctions.postNewModelRefurb
);

module.exports = router;
