const express = require("express");
const path = require("path");
const cors = require("cors");
const { verifyToken } = require("./handlers/auth");

const brandRoutes = require("./routes/brandRoutes");
const modelRoutes = require("./routes/modelRoutes");
const repairRoutes = require("./routes/repairRoutes");
const refurbRoutes = require("./routes/refurbRoutes");
const otherRoutes = require("./routes/otherRoutes");

const app = express();

// use some application-level middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// Use the middleware "verifyToken" for all routes except "/login" & front-user path
app.use((req, res, next) => {
  const { path: reqPath, method } = req;
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
    unauthenticatedPaths.includes(reqPath) ||
    unauthenticatedPrefixes.some((prefix) => reqPath.startsWith(prefix));

  const isUnauthenticatedPathForGetAndPost =
    unauthenticatedPathsForGetAndPost.includes(reqPath);

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

app.use(brandRoutes);
app.use(modelRoutes);
app.use(repairRoutes);
app.use(refurbRoutes);
app.use(otherRoutes);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
