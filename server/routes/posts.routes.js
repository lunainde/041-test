//server/routes/posts.routes.js
const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// GET "/api/posts" => Route to list all available posts
router.get("/", postController.getAllPosts);

// GET "/api/posts/recent-posts" => Route to get the last 3 posts
router.get("/recent", postController.getRecentPosts);

// GET "/api/posts/:postId" => Route to get a specific post by ID
router.get("/:postId", postController.getPostById);

// POST '/api/posts' => for saving a new post in the database
router.post("/", isAuthenticated, postController.createPost);

// PUT '/api/posts/:postId' => for updating a post
// router.put("/:postId", isAuthenticated, isPostOwner, postController.updatePost);
router.put("/:postId", isAuthenticated, postController.updatePost);

// DELETE '/api/posts/:postId' => for deleting a post
// router.delete("/:postId", isAuthenticated, isPostOwner, postController.deletePost);
router.delete("/:postId", isAuthenticated, postController.deletePost);

// POST '/api/posts/upload' => for uploading image to Cloudinary (if needed)
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ fileUrl: req.file.path });
});

module.exports = router;
