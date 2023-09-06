const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const otherRoutesFunctions = require("../handlers/otherRoutesFunctions");
const {
  sendConfirmationEmail,
  sendContactEmail,
  sendReservationEmail,
} = require("../handlers/nodeMailer");

const { verifyRecaptchaToken } = require("../handlers/reCaptcha");
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
router.post("/api/sendcontactemail", verifyRecaptchaToken, sendContactEmail);
// Send reservation email
router.post(
  "/api/sendemailreservation",
  verifyRecaptchaToken,
  sendReservationEmail
);

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
  (req, res, next) => {
    const ext = path.extname(req.file.originalname);
    const baseName = path.basename(req.file.originalname, ext);
    let suffix = "";

    if (req.body.isLarge === "true") {
      suffix = "_large";
    } else if (req.body.isSmall === "true") {
      suffix = "_small";
    }

    const finalName = `${baseName}${suffix}${ext}`;
    const oldPath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "assets",
      "images",
      "header",
      req.file.filename
    );
    const newPath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "assets",
      "images",
      "header",
      finalName
    );

    fs.rename(oldPath, newPath, (err) => {
      if (err) return next(err);
      req.file.filename = finalName;
      return next();
    });
  },
  otherRoutesFunctions.postNewHeaderPic
);

// Delete pic header
router.delete("/api-token/header/:id", otherRoutesFunctions.deleteHeaderPic);
module.exports = router;
