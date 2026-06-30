const express = require("express");
const router = express.Router();

const {
  uploadProfileImage,
  uploadPromptImage,
} = require("../controllers/upload.controller");

const {
  singleImageUpload,
} = require("../middleware/multer.middleware");

router.post(
  "/profile-image",
  singleImageUpload,
  uploadProfileImage
);

router.post(
  "/prompt-image",
  singleImageUpload,
  uploadPromptImage
);

module.exports = router;