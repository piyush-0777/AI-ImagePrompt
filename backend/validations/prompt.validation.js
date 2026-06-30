const Joi = require("joi");

const createPromptValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(3)
      .max(255)
      .required(),

    prompt_text: Joi.string()
      .required(),

    image_url: Joi.string()
      .uri()
      .allow("")
      .optional(),

    tags: Joi.array()
      .items(Joi.string())
      .optional(),
  });

  return schema.validate(data);
};

const updatePromptValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(3)
      .max(255),

    prompt_text: Joi.string(),

    image_url: Joi.string()
      .uri()
      .allow(""),

    tags: Joi.array()
      .items(Joi.string()),
  });

  return schema.validate(data);
};

module.exports = {
  createPromptValidation,
  updatePromptValidation,
};