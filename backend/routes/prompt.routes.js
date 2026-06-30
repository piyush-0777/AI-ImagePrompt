const express = require("express");
const router = express.Router();

const promptController = require("../controllers/prompt.controller");
const authMiddleware = require("../middleware/auth.middleware");

const likeController = require("../controllers/like.controller");
const saveController = require("../controllers/save.controller");
const { singleImageUpload } = require("../middleware/multer.middleware");

// Prompt CRUD

//creat new prompt
router.post(
  "/",
  authMiddleware, singleImageUpload ,
  promptController.createPrompt
); //1

// get all prompt
router.get("/", promptController.getAllPrompts); //1
// git search prompt
router.get("/search", promptController.searchPrompts);   //0
//get tranding prompt
router.get("/trending", promptController.getTrendingPrompts); //0
//get latest prompt
router.get("/latest", promptController.getLatestPrompts); //0
//get prompt by id
router.get("/:promptId", promptController.getPromptById);  //1

//get prompt deteal
router.get("/PromptDetail/:promptId", promptController.getPromptDetail);  //1
//update prompt
router.put(
  "/:promptId",
  authMiddleware, singleImageUpload ,
  promptController.updatePrompt
);  //1

//delet prompt
router.delete(
  "/:promptId",
  authMiddleware,
  promptController.deletePrompt
); //1

// Likes prompt
router.post(
  "/:promptId/like",
  authMiddleware,
  likeController.likePrompt
);  //1

//unlike prompt
router.delete(
  "/:promptId/like",
  authMiddleware,
  likeController.unlikePrompt
);  //1

//get like count
router.get(
  "/:promptId/likes",
  likeController.getLikesCount
);  //1

// Saves prompt
router.post(
  "/:promptId/save",
  authMiddleware,
  saveController.savePrompt
); //1
 
//delet prompt form save array  save
router.delete(
  "/:promptId/save",
  authMiddleware,
  saveController.removeSavedPrompt
); //1

//get save conunt on prompt
router.get(
  "/:promptId/saves",
  saveController.getSaveCount
); //1
router.get("/PromptDetail/:promptId/isLikeorSave",authMiddleware, promptController.isLike_SavePrompt); 

module.exports = router;