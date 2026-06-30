const tagService = require("../services/tag.service");

class TagController {
  async getAllTags(req, res, next) {
    try {
      const tags =
        await tagService.getAllTags();

      res.json({
        success: true,
        data: tags,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPromptsByTag(req, res, next) {
    try {
      const prompts =
        await tagService.getPromptsByTag(
          req.params.tagId,
          req.query
        );

      res.json({
        success: true,
        data: prompts,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TagController();