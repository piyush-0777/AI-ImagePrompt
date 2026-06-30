const saveRepository = require("../repositories/save.repository");

class SaveController {
  async savePrompt(req, res, next) {
    try {
      await saveRepository.savePrompt(
        req.user.id,
        req.params.promptId
      );

      res.json({
        success: true,
        message: "Prompt saved",
      });
    } catch (error) {
      next(error);
    }
  }

  async removeSavedPrompt(req, res, next) {
    try {
      await saveRepository.removeSavedPrompt(
        req.user.id,
        req.params.promptId
      );

      res.json({
        success: true,
        message:
          "Prompt removed from saved",
      });
    } catch (error) {
      next(error);
    }
  }

  async getSaveCount(req, res, next) {
    try {
      const count =
        await saveRepository.countSaves(
          req.params.promptId
        );

      res.json({ count });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SaveController();