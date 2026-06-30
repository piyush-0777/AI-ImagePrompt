const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .max(50)
      .required(),

    email: Joi.string()
      .email()
      .required(),

    password: Joi.string()
      .min(6)
      .max(50)
      .required(),

    bio: Joi.string()
      .allow("")
      .optional(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),

    password: Joi.string()
      .required(),
  });

  return schema.validate(data);
};

const updateProfileValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .max(50),

    bio: Joi.string()
      .allow(""),

    profile_image: Joi.string()
      .uri(),
  });

  return schema.validate(data);
};

const changePasswordValidation = (data) => {
  const schema = Joi.object({
    currentPassword: Joi.string()
      .required(),

    newPassword: Joi.string()
      .min(6)
      .max(50)
      .required(),
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
};