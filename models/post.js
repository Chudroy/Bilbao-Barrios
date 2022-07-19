const Reply = require("./reply");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_300");
});

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: [3, "title is too short"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
  },
  image: ImageSchema,
  replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
  likes: Number,
});

PostSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Reply.deleteMany({
      _id: {
        $in: doc.replies,
      },
    });
  }
});

const postSchemaJoi = Joi.object({
  title: Joi.string().alphanum().min(3).max(30).required(),
  content: Joi.string().min(2).required(),
});

module.exports = mongoose.model("Post", PostSchema);
module.exports.postSchemaJoi = postSchemaJoi;
