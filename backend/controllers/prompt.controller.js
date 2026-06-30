const promptService = require("../services/prompt.service");
const userService = require("../services/user.service");
const likeRepository = require('../repositories/like.repository')
const saveRepository = require('../repositories/save.repository')

class PromptController {
  async createPrompt(req, res, next) {
    try {
      // console.log(req.body);
      const prompt =
        await promptService.createPrompt(
          req.user.id,
          req.body,
          req.file
        );

      res.status(201).json({
        success: true,
        message: "Prompt created successfully",
        data: prompt,
      });
    } catch (error) {
      next(error);
    }
  }

 async getAllPrompts(req, res, next) {
  try {
    const data =
      await promptService.getAllPrompts(
        req.query.page,
        req.query.limit
      );

    res.json({
      success: true,
      ...data,
    });
  } catch (error) {
    next(error);
  }
}
  async getPromptById(req, res, next) {
    try {
      const prompt =
        await promptService.getPromptById(
          req.params.promptId
        );

      res.json({
        success: true,
        data: prompt,
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePrompt(req, res, next) {
    try {
      const prompt =
        await promptService.updatePrompt(
          req.params.promptId,
          req.user.id,
          req.body ,
          req.file
        );

      res.json({
        success: true,
        message: "Prompt updated successfully",
        data: prompt,
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePrompt(req, res, next) {
    try {
      await promptService.deletePrompt(
        req.params.promptId,
        req.user.id
      );

      res.json({
        success: true,
        message: "Prompt deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async searchPrompts(req, res, next) {
    try {
      const result =
        await promptService.searchPrompts(
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

  async getTrendingPrompts(req, res, next) {
    try {
      const prompts =
        await promptService.getTrendingPrompts();

      res.json({
        success: true,
        data: prompts,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLatestPrompts(req, res, next) {
    try {
      const prompts =
        await promptService.getLatestPrompts(
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

  async getPromptDetail(req , res , next) {
    try {
      const prompt =
        await promptService.getPromptById(
          req.params.promptId
        );
        const user = await userService.getProfile(prompt.user_id);
        const userdeteal = {
          username:user.username,
          id:user.id,
          profile_image:user.profile_image
        }
        res.json({
        success: true,
        result:{prompt , user:userdeteal},
      });
    }catch (error) {
      next(error);
    }
  }
  async isLike_SavePrompt (req, res , next) {
    try {
      const userID = req.user.id;
      const promptID = req.params.promptId;
      const isLike = await likeRepository.isLiked( userID, promptID);
      const isSave = await saveRepository.isSave(userID, promptID);
      res.json({
        success: true ,
        isLike: isLike,
        isSave : isSave
      })
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PromptController();