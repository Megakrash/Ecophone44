const multer = require("multer");
const path = require("path");

// Import & storage brand pic
const storageBrandPic = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/images/marques");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    req.body.filename = `${req.body.name.toUpperCase()}${
      ext === ".jpg" ? ".jpg" : ".png"
    }`;
    cb(null, req.body.filename.toString());
  },
});

const uploadBrandPic = multer({ storage: storageBrandPic });

// Import & storage model pic
const storageModelPic = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/images/modeles");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    req.body.filename = `${req.body.name.toUpperCase()}${
      ext === ".jpg" ? ".jpg" : ".png"
    }`.replace(/\s+/g, "");
    cb(null, req.body.filename.toString());
  },
});

const uploadModelPic = multer({ storage: storageModelPic });

module.exports = {
  uploadBrandPic,
  uploadModelPic,
};
