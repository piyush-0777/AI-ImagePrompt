const userRepository = require("../repositories/user.repository");
const promptRepository = require("../repositories/prompt.repository");
const tagRepository = require("../repositories/tag.repository");

class AdminService {
  async getDashboardStats() {
    const [
      totalUsers,
      totalPrompts,
      totalTags,
    ] = await Promise.all([
      userRepository.countUsers(),
      promptRepository.countPrompts(),
      tagRepository.countTags(),
    ]);

    return {
      totalUsers,
      totalPrompts,
      totalTags,
    };
  }

  async getAllUsers() {
    return await userRepository.getAllUsers();
  }

  async deleteUser(userId) {
    const user =
      await userRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    await userRepository.deleteUser(userId);

    return {
      message: "User deleted successfully",
    };
  }

  async getAllPrompts() {
    return await promptRepository.getAllPrompts();
  }

  async deletePrompt(promptId) {
    const prompt =
      await promptRepository.findPromptById(
        promptId
      );

    if (!prompt) {
      throw new Error("Prompt not found");
    }

    await promptRepository.deletePrompt(
      promptId
    );

    return {
      message: "Prompt deleted successfully",
    };
  }

  async getAllTags() {
    return await tagRepository.getAllTags();
  }

  async createTag(name) {
    const existingTag =
      await tagRepository.findTagByName(name);

    if (existingTag) {
      throw new Error("Tag already exists");
    }

    const tag =
      await tagRepository.createTag( name );

    return tag;
  }

  async deleteTag(tagId) {
    const tag =
      await tagRepository.findTagById(tagId);

    if (!tag) {
      throw new Error("Tag not found");
    }

    await tagRepository.deleteTag(tagId);

    return {
      message: "Tag deleted successfully",
    };
  }
}

module.exports = new AdminService();