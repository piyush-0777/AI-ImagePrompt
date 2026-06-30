const promptService = require("../services/prompt.service");

class FeedController {
  async getHomeFeed(req, res, next) {
    try {
      const result =
        await promptService.getAllPrompts(
          req.query
        );

      res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTrendingFeed(req, res, next) {
    try {
      const data =
        await promptService.getTrendingPrompts();

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLatestFeed(req, res, next) {
    try {
      const data =
        await promptService.getLatestPrompts(
          req.query
        );

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPopularFeed(req, res, next) {
    try {
      const data =
        await promptService.getTrendingPrompts();

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FeedController();