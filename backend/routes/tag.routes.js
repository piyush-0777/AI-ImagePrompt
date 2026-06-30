const express = require("express");
const router = express.Router();

const tagController = require("../controllers/tag.controller");

router.get("/", tagController.getAllTags);

router.get(
  "/:tagId/prompts",
  tagController.getPromptsByTag
);

module.exports = router;