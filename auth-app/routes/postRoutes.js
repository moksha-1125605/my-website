const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  deletePost
} = require("../controllers/postController");

const auth = require("../middleware/authMiddleware");

// CREATE POST
router.post("/", auth, createPost);

// GET POSTS
router.get("/", getPosts);

// DELETE POST
router.delete("/:id", auth, deletePost);

module.exports = router;