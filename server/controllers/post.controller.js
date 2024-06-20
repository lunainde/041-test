//server/controllers/post.controller.js
const Post = require("../models/Post.model");

//CREATE/POST a new post
exports.createPost = async (req, res, next) => {
  try {
    const { imgUrl, title, tags, content, user } = req.body;
    const newPost = await Post.create({
      imgUrl,
      title,
      tags,
      content,
      user,
    });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};
//GET POST BY ID
exports.getPostById = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId).populate("user");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

//GET ALL posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("user");
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

//GET 3 LAST POSTS
exports.getRecentPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(3).populate("user");

    //const postsByStartups = posts.filter(post => post.user.category == "startup")

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// UPDATE a post
exports.updatePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const { imgUrl, title, tag, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { imgUrl, title, tag, content },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

//DELETE a post
exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
