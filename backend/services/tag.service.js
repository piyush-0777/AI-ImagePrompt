const tagRepository = require("../repositories/tag.repository");

class TagService {
  async createTag(name) {
    if (!name || !name.trim()) {
      throw new Error("Tag name is required");
    }

    return await tagRepository.createTag(
      name.trim().toLowerCase()
    );
  }

  async updateTag(tagId, name) {
    const tags =
      await tagRepository.getAllTags();

    const tag = tags.find(
      (tag) => tag.id === tagId
    );

    if (!tag) {
      throw new Error("Tag not found");
    }

    return await tagRepository.updateTag(
      tagId,
      name.trim().toLowerCase()
    );
  }

  async deleteTag(tagId) {
    const tags =
      await tagRepository.getAllTags();

    const tag = tags.find(
      (tag) => tag.id === tagId
    );

    if (!tag) {
      throw new Error("Tag not found");
    }

    await tagRepository.deleteTag(tagId);

    return {
      message: "Tag deleted successfully",
    };
  }

  async getAllTags() {
    return await tagRepository.getAllTags();
  }

  async getPromptsByTag(tagId) {
    const prompts =
      await tagRepository.getPromptsByTag(
        tagId
      );

    return prompts;
  }
}

module.exports = new TagService();