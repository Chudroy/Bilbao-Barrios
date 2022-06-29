const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
  author: {
    type: String,
    required: true,
    minLength: 1,
  },
  date: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minLength: 1,
  },
});

ReplySchema.add({
  replies: [ReplySchema],
});

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: [3, "Title is too short"],
  },
  author: {
    type: String,
    required: true,
    minLength: 1,
  },
  date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minLength: 1,
  },
  image: String,
  replies: [ReplySchema],
  // TODO: add images
});

module.exports = mongoose.model("Post", PostSchema);
