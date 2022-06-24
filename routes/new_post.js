const path = require("path");
const express = require('express');
const Post = require("../models/post")
const router = express.Router();


/* GET home page. */
router.get('/', async function (req, res, next) {
    res.render('index', { title: 'New Post' });
});

module.exports = router; 