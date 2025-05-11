const express = require("express");
const {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
} = require("../controller/subcategory.controller");
const { auth } = require("../Middleware/auth.middleware");

const router = express.Router();

router.route("/").post(auth, createSubcategory).get(getAllSubcategories);
router
  .route("/:id")
  .get(getSubcategoryById)
  .put(auth, updateSubcategory)
  .delete(auth, deleteSubcategory);

module.exports = router;
