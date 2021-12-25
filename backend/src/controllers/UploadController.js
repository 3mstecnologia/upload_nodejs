const multer = require("multer");
const path = require("path");
const Uploads = require("../models/Uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadController = multer({ storage: storage });

module.exports = uploadController;
