const express = require("express");

const router = express.Router();

const otherRoutesFunctions = require("../handlers/otherRoutesFunctions");
const {
  sendConfirmationEmail,
  sendContactEmail,
} = require("../handlers/nodeMailer");
const { verifyPassword } = require("../handlers/auth");
const { uploadHeaderPic } = require("./multers/multers");

// -----------------------------------
// ---- Front user no verify token ---
// -----------------------------------
// Get the header
router.get("/api/header", otherRoutesFunctions.getheader);

// Get the calendar events
router.get("/api/calendar", otherRoutesFunctions.getCalendarForFront);

// Add new event
router.post(
  "/api/calendar",
  otherRoutesFunctions.postNewEvent,
  sendConfirmationEmail
);
// Send contact email
router.post("/api/sendcontactemail", sendContactEmail);

// --------------------------------
// ------------ Back-office -------
// --------------------------------
// First verify user in login.jsx
router.get("/api/user", otherRoutesFunctions.getUserToVerifyToken);
// LOGIN
router.post(
  "/api/login",
  otherRoutesFunctions.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// Post new header
router.post(
  "/api-token/header",
  uploadHeaderPic.single("file"),
  otherRoutesFunctions.postNewHeaderPic
);
// Delete pic header
router.delete("/api-token/header/:id", otherRoutesFunctions.deleteHeaderPic);
module.exports = router;
