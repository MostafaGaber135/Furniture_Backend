const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
<<<<<<< HEAD
  likePost,
  commentPost,
  deleteComment
} = require("../controller/post.controller.js");
const upload = require("../utils/multer.utils.js");
router.post("/", upload.single("image"), createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id", upload.single("image"),updatePost);
router.delete("/:id", deletePost);
router.put("/like/:id", likePost);
router.post("/comment/:id", commentPost);
router.delete("/comment/:id", deleteComment);
=======
} = require("../controller/post.controller");
const { auth } = require("../Middleware/auth.middleware");

const router = express.Router();

router.route("/").post(auth, createPost).get(getAllPosts);
router
  .route("/:id")
  .get(getPostById)
  .put(auth, updatePost)
  .delete(auth, deletePost);
>>>>>>> 558d9e0 (first commit)

module.exports = router;
