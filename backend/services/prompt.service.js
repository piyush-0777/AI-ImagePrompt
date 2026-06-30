const promptRepository = require("../repositories/prompt.repository");
const likeRepository = require("../repositories/like.repository");
const saveRepository = require("../repositories/save.repository");
const tagRepository = require("../repositories/tag.repository");

const {
  uploadImage,
  deleteImage,
} = require("../utils/cloudinaryUpload");

class PromptService {
  async createPrompt(userId, promptData, file) {
    let image = null;
    // console.log('service ' , userId, promptData.title , promptData.prompt_text, file );

    if (file) {
      const uploadedImage = await uploadImage(
        file.buffer,
        "myprompt/prompts"
      );

      image = {
        prompt_image:
          uploadedImage.secure_url,
        prompt_image_public_id:
          uploadedImage.public_id,
      };
    }

    const prompt =
      await promptRepository.createPrompt(
        userId,
        promptData.title,
        promptData.prompt_text,
        image,
      );

     
      if (typeof promptData.tagIds === "string") {
      promptData.tagIds = JSON.parse(promptData.tagIds);
    }

      if (promptData.tagIds?.length) {
    for (const tagId of promptData.tagIds) {
      const tag =
        await tagRepository.findTagById(tagId);

      if (!tag) {
        throw new Error(`Tag ${tagId} not found`);
      }

      await tagRepository.attachTagToPrompt(
        prompt.id,
        tagId
      );
    }
  }

    return prompt;
  }

  async getPromptById(promptId) {
    const prompt =
      await promptRepository.findPromptById(
        promptId
      );

    if (!prompt) {
      throw new Error("Prompt not found");
    }

    return prompt;
  }

  async updatePrompt(
    promptId,
    userId,
    data, 
    file
  ) {
    let imgURL = null;
    const prompt =
      await promptRepository.findPromptById(
        promptId
      );

    if (!prompt) {
      throw new Error("Prompt not found");
    }

    if (prompt.user_id !== userId) {
      throw new Error(
        "You can only update your own prompts"
      );
    }

    if (file) {
      if (prompt.image_url) {
        await deleteImage(
          prompt.image_url.prompt_image_public_id
        );
      }
      const uploadedImage =
        await uploadImage(
          file.buffer,
          "myprompt/profile-images"
        );

      imgURL = {
        prompt_image:
          uploadedImage.secure_url,
        prompt_image_public_id:
          uploadedImage.public_id,
      }

    } else {
      imgURL = prompt.image_url
    }

    return await promptRepository.updatePrompt(
      promptId,
      data.title , data.prompt_text , imgURL
    );
  }

  async deletePrompt(promptId, userId) {
    const prompt =
      await promptRepository.findPromptById(
        promptId
      );

    if (!prompt) {
      throw new Error("Prompt not found");
    }

    if (prompt.user_id !== userId) {
      throw new Error(
        "You can only delete your own prompts"
      );
    }
    await deleteImage(
        prompt.image_url.prompt_image_public_id
      );

    await promptRepository.deletePrompt(
      promptId
    );

    return {
      message:
        "Prompt deleted successfully",
    };
  }

  async getAllPrompts(page = 1, limit = 20) {
  page = Number(page);
  limit = Number(limit);

  const offset = (page - 1) * limit;

  const { prompts, total } =
    await promptRepository.getAllPrompts(
      limit,
      offset
    );

  const totalPages = Math.ceil(total / limit);

  return {
    prompts,
    page,
    limit,
    total,
    totalPages,
    hasMore: page < totalPages,
  };
}

  async searchPrompts(
    query,
    page,
    limit
  ) {
    return await promptRepository.searchPrompts(
      query,
      page,
      limit
    );
  }

  async getTrendingPrompts() {
    return await promptRepository.getTrendingPrompts();
  }

  async getLatestPrompts() {
    return await promptRepository.getLatestPrompts();
  }

  async likePrompt(userId, promptId) {
    const prompt =
      await promptRepository.findPromptById(
        promptId
      );

    if (!prompt) {
      throw new Error("Prompt not found");
    }

    const alreadyLiked =
      await likeRepository.isLiked(
        userId,
        promptId
      );

    if (alreadyLiked) {
      throw new Error(
        "Prompt already liked"
      );
    }

    await likeRepository.likePrompt(
      userId,
      promptId
    );

    return {
      message:
        "Prompt liked successfully",
    };
  }

  async unlikePrompt(userId, promptId) {
    await likeRepository.unlikePrompt(
      userId,
      promptId
    );

    return {
      message:
        "Prompt unliked successfully",
    };
  }

  async savePrompt(userId, promptId) {
    const prompt =
      await promptRepository.findPromptById(
        promptId
      );

    if (!prompt) {
      throw new Error("Prompt not found");
    }

    await saveRepository.savePrompt(
      userId,
      promptId
    );

    return {
      message:
        "Prompt saved successfully",
    };
  }

  async removeSavedPrompt(
    userId,
    promptId
  ) {
    await saveRepository.removeSavedPrompt(
      userId,
      promptId
    );

    return {
      message:
        "Saved prompt removed successfully",
    };
  }

  async getMySavedPrompts(userId) {
    return await saveRepository.getMySavedPrompts(
      userId
    );
  }
}

module.exports = new PromptService();