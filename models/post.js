const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: [3, "title is too short"],
  },
  author: {
    type: String,
    required: true,
    minlength: 1,
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
  image: String,
  replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
  likes: Number,
});

module.exports = mongoose.model("Post", PostSchema);
