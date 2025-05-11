const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller");
const { auth } = require("../Middleware/auth.middleware");

const router = express.Router();

router.route("/").post(auth, createCategory).get(getAllCategories);
router
  .route("/:id")
  .get(getCategoryById)
  .put(auth, updateCategory)
  .delete(auth, deleteCategory);

module.exports = router;
