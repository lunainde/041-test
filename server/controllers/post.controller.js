//server/controllers/post.controller.js
const Post = require("../models/Post.model");

// Function to create a new post
exports.createPost = async (req, res, next) => {
  try {
    const { imgUrl, title, postTag, content } = req.body;
    const author = req.user._id; // is user authenticated?
    const newPost = await Post.create({ imgUrl, title, postTag, content, author });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

// Function to get all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("author", "imgUrl venture tag description");
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// Function to update a post
exports.updatePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const { imgUrl, title, postTag, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(postId, { imgUrl, title, postTag, content }, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// Function to delete a post
exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};