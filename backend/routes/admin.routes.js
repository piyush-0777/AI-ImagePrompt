const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

router.use(authMiddleware);
router.use(adminMiddleware);

// Users
router.get(
  "/users",
  adminController.getAllUsers
);

router.delete(
  "/users/:userId",
  adminController.deleteUser
);

// Prompts
router.get(
  "/prompts",
  adminController.getAllPrompts
);

router.delete(
  "/prompts/:promptId",
  adminController.deletePrompt
);

// Tags
router.post(
  "/tags",
  adminController.createTag
);  //1

router.put(
  "/tags/:tagId",
  adminController.updateTag
);

router.delete(
  "/tags/:tagId",
  adminController.deleteTag
);

module.exports = router;