var express = require('express');
const app = require('../app');
var router = express.Router();
const Post = require("../models/post")

router.get('/new', async function (req, res, next) {
    res.render('post/new');
});

router.post("/", async (req, res) => {
    const newPost = new Post(req.body.post)
    await newPost.save()
    res.redirect(`/post/${newPost._id}`)
})

router.get('/:id', async function (req, res, next) {
    const { id } = req.params
    const post = await Post.findById(id)
    res.render('post/show', { post });
});

router.get('/:id/edit', async function (req, res, next) {
    const { id } = req.params
    const post = await Post.findById(id)
    res.render('post/edit', { post });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const editedPost = await Post.findByIdAndUpdate(id, { ...req.body.post }, { useFindAndModify: false })
    res.redirect(`/post/${editedPost._id}`)
})

module.exports = router;