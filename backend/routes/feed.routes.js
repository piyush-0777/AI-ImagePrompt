const express = require("express");
const router = express.Router();

const feedController = require("../controllers/feed.controller");

router.get("/", feedController.getHomeFeed);

router.get(
  "/trending",
  feedController.getTrendingFeed
);

router.get(
  "/latest",
  feedController.getLatestFeed
);

router.get(
  "/popular",
  feedController.getPopularFeed
);

module.exports = router;