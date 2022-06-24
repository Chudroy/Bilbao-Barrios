const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    title: String,
    author: String,
    date: Date,
    content: String
})

const PostSchema = new Schema({
    title: String,
    author: String,
    date: Date,
    content: String,
    comments: [CommentSchema]
    // TODO: add images
})

module.exports = mongoose.model("Post", PostSchema)
