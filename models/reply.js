const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
  author: {
    type: String,
    required: true,
    minlength: 1,
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
});

ReplySchema.add({
  replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
});

module.exports = mongoose.model("Reply", ReplySchema);
