const multer = require("multer");

const uploadFolders = {
    //adminImage: "public/admin-upload",
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = uploadFolders[file.fieldname];

    if (uploadFolder) {
      cb(null, uploadFolder);
    } else {
      cb(new Error("Invalid fieldname"), false);
    }
  },
  filename: (req, file, cb) => {
    const date = new Date();
    const formattedDate = date.toISOString().replace(/:/g, "-") + "-";
    cb(null, formattedDate + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // DOCX
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("File format not supported"), false);
  }
};

const multerConfig = (req, res, next) => {
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  }).fields([
      {
        // name: "adminImage",
        // maxCount: ,
      },
  ])(req, res, next);
};

module.exports = multerConfig;
