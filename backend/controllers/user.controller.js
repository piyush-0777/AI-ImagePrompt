const userService = require("../services/user.service");
const promptService = require("../services/prompt.service");

class UserController {
  async getProfile(req, res, next) {
    try {
      const user = await userService.getProfile(
        req.params.userId
      );

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const user = await userService.updateProfile(
        req.params.userId,
        req.body
      );

      res.json({
        success: true,
        message: "Profile updated successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async uploadProfileImage(req, res, next) {
    try {

      const result =
        await userService.uploadProfileImage(
          req.user.id,
          req.file
        );

      res.json({
        success: true,
        message: "Profile image uploaded successfully",
        data: result,
      });
    } catch (error) {
     
      next(error);
    }
  }

  async getUserPrompts(req, res, next) {
    try {
      const result =
        await userService.getMyPrompts(
          req.params.userId,
          req.query
        );
        
      res.json({
        success: true,
        data:result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getSavedPrompts(req, res, next) {
    try {
      const result =
        await userService.getMySavedPrompts(
          req.params.userId,
          req.user.id
        );

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLikedPrompts(req, res, next) {
    try {
      const result =
        await userService.getMyLikedPrompts(
          req.params.userId,
          req.user.id
        );

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();