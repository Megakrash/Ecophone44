const multer = require("multer");
// const fs = require("fs");

// Import des videos dans le backend
const storageBrandPic = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/images/marques");
  },
  filename: (req, file, cb) => {
    req.body.filename = `${req.body.name.toUpperCase()}.jpg`;
    cb(null, req.body.filename.toString());
  },
});

const uploadBrandPic = multer({ storage: storageBrandPic });

module.exports = {
  uploadBrandPic,
};
