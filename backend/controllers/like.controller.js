const likeRepository = require("../repositories/like.repository");

class LikeController {
  async likePrompt(req, res, next) {
    try {
      await likeRepository.likePrompt(
        req.user.id,
        req.params.promptId
      );

      res.json({
        success: true,
        message: "Prompt liked",
      });
    } catch (error) {
      next(error);
    }
  }

  async unlikePrompt(req, res, next) {
    try {
      await likeRepository.unlikePrompt(
        req.user.id,
        req.params.promptId
      );

      res.json({
        success: true,
        message: "Like removed",
      });
    } catch (error) {
      next(error);
    }
  }

  async getLikesCount(req, res, next) {
    try {
      const count =
        await likeRepository.countLikes(
          req.params.promptId
        );

      res.json({ count });
    } catch (error) {
      next(error);
    }
  }
  
}

module.exports = new LikeController();