const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const ReplySchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
  },
  originalPost: { type: Schema.Types.ObjectId, ref: "Post" },
  likes: Number,
});

ReplySchema.add({
  replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
});

module.exports = mongoose.model("Reply", ReplySchema);
