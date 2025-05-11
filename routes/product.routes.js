const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");
const { auth } = require("../Middleware/auth.middleware");

const router = express.Router();

router.route("/").post(auth, createProduct).get(getAllProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(auth, updateProduct)
  .delete(auth, deleteProduct);

module.exports = router;
