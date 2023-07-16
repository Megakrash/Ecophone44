const express = require("express");

const router = express.Router();

const otherRoutesFunctions = require("../handlers/otherRoutesFunctions");
const { sendConfirmationEmail } = require("../handlers/nodeMailer");
const { verifyPassword } = require("../handlers/auth");

// -----------------------------------
// ---- Front user no verify token ---
// -----------------------------------
// Get the calendar events
router.get("/calendar", otherRoutesFunctions.getCalendarForFront);

// Add new event
router.post(
  "/calendar",
  otherRoutesFunctions.postNewEvent,
  sendConfirmationEmail
);

// --------------------------------
// ------------ Back-office -------
// --------------------------------
// First verify user in login.jsx
router.get("/user", otherRoutesFunctions.getUserToVerifyToken);
// LOGIN
router.post(
  "/login",
  otherRoutesFunctions.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
module.exports = router;
