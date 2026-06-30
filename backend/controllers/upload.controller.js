const { uploadImage } = require("../utils/cloudinaryUpload");

const uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const result = await uploadImage(
      req.file.buffer,
      "myprompt/profile-images"
    );

    res.status(200).json({
      success: true,
      data: {
        imageUrl: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    next(error);
  }
};

const uploadPromptImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const result = await uploadImage(
      req.file.buffer,
      "myprompt/prompt-images"
    );

    res.status(200).json({
      success: true,
      data: {
        imageUrl: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadProfileImage,
  uploadPromptImage,
};