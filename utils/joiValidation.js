const Joi = require("joi");
const { postSchemaJoi } = require("../models/post");
const ExpressError = require("../utils/expressError");

/**
 * Post validation core code,
 * common to the rest of the
 * wrapper functions
 */

const validatePost = function (body) {
  const result = postSchemaJoi.validate(
    {
      title: body.post.title,
      content: body.post.content,
    },
    { abortEarly: false }
  );

  return result.error ? result.error : undefined;
};

const validatePostMulter = (body) => {
  const error = validatePost(body);
  if (error) {
    return false;
  }
  return true;
};

const validatePostMiddleware = (req, res, next) => {
  const error = validatePost(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  }
  next();
};

module.exports = {
  validatePostMiddleware,
  validatePostMulter,
};
