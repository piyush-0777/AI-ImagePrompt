const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { singleImageUpload } = require("../middleware/multer.middleware");

//get user by id
router.get("/:userId", userController.getProfile);  //1


// update profile
router.put(
  "/:userId",
  authMiddleware,
  userController.updateProfile
);   //1

//update profile image
router.post(
  "/profile-image",
  authMiddleware,singleImageUpload ,
  userController.uploadProfileImage
);  //1

// get user prompt
router.get(
  "/:userId/prompts",
  userController.getUserPrompts
);  //1

//get user saved prompt
router.get(
  "/:userId/saved-prompts",
  authMiddleware,
  userController.getSavedPrompts
); //1

//get user liked prompt
router.get(
  "/:userId/liked-prompts",
  authMiddleware,
  userController.getLikedPrompts
);  //1

module.exports = router;