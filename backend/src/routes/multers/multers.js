const multer = require("multer");

// Import des videos dans le backend
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/videos");
  },
  filename: (req, file, cb) => {
    const date = new Date().getTime();
    req.body.filename = `${req.body.title + date.toString()}.mp4`;
    cb(null, req.body.filename.toString());
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
};
