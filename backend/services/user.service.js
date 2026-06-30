const userRepository = require("../repositories/user.repository");

const {
  uploadImage,
  deleteImage,
} = require("../utils/cloudinaryUpload");

class UserService {
  async getProfile(userId) {
    const user =
      await userRepository.getProfileById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async updateProfile(userId, data) {
    const {username, bio} = data;
    const user =
      await userRepository.getProfileById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser =
      await userRepository.updateProfile(
        userId,
        username,
        bio
      );

    return updatedUser;
  }

  async uploadProfileImage(userId, file) {

    const user =
      await userRepository.getProfileById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (!file) {
      throw new Error("Image is required");
    }

    if (user.profile_image &&  user.profile_image.profile_image_public_id   ) {
      await deleteImage(
        user.profile_image.profile_image_public_id
      );
    }

    const uploadedImage =
      await uploadImage(
        file.buffer,
        "myprompt/profile-images"
      );

    const updatedUser =
      await userRepository.updateProfileImage(
        userId,
        {
          profile_image:
            uploadedImage.secure_url,
          profile_image_public_id:
            uploadedImage.public_id,
        }
      );

    return updatedUser;
  }

  async deleteAccount(userId) {
    const user =
      await userRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.profile_image_public_id) {
      await deleteImage(
        user.profile_image_public_id
      );
    }

    await userRepository.deleteUser(userId);

    return {
      message:
        "Account deleted successfully",
    };
  }

  async getMyPrompts(userId) {
  return await userRepository.getUserPrompts(userId);
}

async getMySavedPrompts(userId) {
  return await userRepository.getSavedPrompts(userId);
}

async getMyLikedPrompts(userId) {
  return await userRepository.getLikedPrompts(userId);
}
}

module.exports = new UserService();