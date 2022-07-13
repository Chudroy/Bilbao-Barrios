var express = require("express");
var router = express.Router();
const Post = require("../models/post");
const catchAsync = require("../utils/catchAsync");
const post = require("../controllers/post");
/* GET home page. */
router.get("/", post.index);

module.exports = router;
