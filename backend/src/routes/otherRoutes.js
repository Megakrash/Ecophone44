const express = require("express");

const router = express.Router();

const otherRoutesFunctions = require("../handlers/otherRoutesFunctions");
const {
  sendConfirmationEmail,
  sendContactEmail,
} = require("../handlers/nodeMailer");
const { verifyPassword } = require("../handlers/auth");

// -----------------------------------
// ---- Front user no verify token ---
// -----------------------------------
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
module.exports = router;
