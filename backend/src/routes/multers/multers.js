const multer = require("multer");
const path = require("path");

const generateFileName = (req, file, cb) => {
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
  }`.replace(/\s+/g, "");
  cb(null, req.body.filename);
};

const createMulterStorage = (destinationPath) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destinationPath);
    },
    filename: generateFileName,
  });

const uploadBrandPic = multer({
  storage: createMulterStorage("./public/assets/images/brands"),
});
const uploadModelPic = multer({
  storage: createMulterStorage("./public/assets/images/models"),
});
const uploadHeaderPic = multer({
  storage: createMulterStorage("./public/assets/images/header"),
});

module.exports = {
  uploadBrandPic,
  uploadModelPic,
  uploadHeaderPic,
};
