const adminService = require("../services/admin.service");

class AdminController {
  async getAllUsers(req, res, next) {
    try {
      const users =
        await adminService.getAllUsers(
          req.query
        );

      res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      await adminService.deleteUser(
        req.params.userId
      );

      res.json({
        success: true,
        message: "User deleted",
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllPrompts(req, res, next) {
    try {
      const prompts =
        await adminService.getAllPrompts(
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

  async deletePrompt(req, res, next) {
    try {
      await adminService.deletePrompt(
        req.params.promptId
      );

      res.json({
        success: true,
        message: "Prompt deleted",
      });
    } catch (error) {
      next(error);
    }
  }

  async createTag(req, res, next) {
    try {
      const tag =
        await adminService.createTag(
          req.body.name
        );

      res.status(201).json({
        success: true,
        data: tag,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTag(req, res, next) {
    try {
      const tag =
        await adminService.updateTag(
          req.params.tagId,
          req.body.name
        );

      res.json({
        success: true,
        data: tag,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTag(req, res, next) {
    try {
      await adminService.deleteTag(
        req.params.tagId
      );

      res.json({
        success: true,
        message: "Tag deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();