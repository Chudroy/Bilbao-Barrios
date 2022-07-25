const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dateTime = require("../controllers/dateTime");

const ReplySchema = new Schema({
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
  originalPost: { type: Schema.Types.ObjectId, ref: "Post" },
  likes: Number,
});

ReplySchema.virtual("timeSinceReply").get(function () {
  return dateTime.getTimeDif(this.date);
});

ReplySchema.add({
  replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
});

module.exports = mongoose.model("Reply", ReplySchema);
