const multer = require("multer");
const path = require("path");

// Import & storage brand pic
const storageBrandPic = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/images/marques");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}-${now
      .getHours()
      .toString()
      .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
    req.body.filename = `${req.body.name.toUpperCase()}_${timestamp}${
      ext === ".jpg" ? ".jpg" : ".png"
    }`.replace(/\s+/g, ""); // Ajoute la date et l'heure actuelles au nom de fichier modifié
    cb(null, req.body.filename);
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
