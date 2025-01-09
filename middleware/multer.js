const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./public/images/upload";

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, (err, bytes) => {
      if (err) {
        return cb(err);
      }

      const ufn = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, ufn);
    });
  },
});

const upload = multer({ storage });

module.exports = upload;
