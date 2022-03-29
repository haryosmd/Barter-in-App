const multer = require("multer");
const upload = multer();

function multerImage() {
  return upload;
}

module.exports = multerImage;
