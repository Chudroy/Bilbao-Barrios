const Reply = require("./reply");
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

PostSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Reply.deleteMany({
      _id: {
        $in: doc.replies,
      },
    });
  }
});
module.exports = mongoose.model("Post", PostSchema);
