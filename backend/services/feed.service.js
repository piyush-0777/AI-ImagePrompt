const promptRepository = require("../repositories/prompt.repository");

class FeedService {
  async getHomeFeed(page = 1, limit = 10) {
    const prompts =
      await promptRepository.getAllPrompts(
        page,
        limit
      );

    return {
      type: "home",
      prompts,
    };
  }

  async getTrendingFeed() {
    const prompts =
      await promptRepository.getTrendingPrompts();

    return {
      type: "trending",
      prompts,
    };
  }

  async getLatestFeed() {
    const prompts =
      await promptRepository.getLatestPrompts();

    return {
      type: "latest",
      prompts,
    };
  }
}

module.exports = new FeedService();