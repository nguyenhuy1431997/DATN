var multer = require("multer");
const { jsonError } = require("../Utils/system");
var path = require("path");
var upload = multer();

var storage = multer.diskStorage({
  //multers disk storage settings
  destination: function(req, file, cb) {
    cb(null, "./Uploads/images");
  },

  filename: function(req, file, cb) {
    var datetimestamp = Date.now()  ;
    var ext = path.extname(file.originalname);
    cb(
      null,
      `${file.originalname.split(ext)[0]}-${datetimestamp}${path.extname(
        file.originalname
      )}`
    );
  }
});

var upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    var ext = path.extname(file.originalname);
    console.log(ext)
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return cb(jsonError("Only_images_are_allowed"));
    }

    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024
  }
});

module.exports = upload;
