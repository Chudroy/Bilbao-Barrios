const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

module.exports.postSchemaJoi = Joi.object({
  title: Joi.string().min(3).max(30).required().escapeHTML(),
  content: Joi.string().min(1).required().escapeHTML(),
});

module.exports.replySchemaJoi = Joi.object({
  content: Joi.string().min(1).required().escapeHTML(),
});
