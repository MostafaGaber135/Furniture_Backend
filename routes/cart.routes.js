const express = require("express");
const {
  createCart,
  getAllCarts,
  getCartById,
  updateCart,
  deleteCart,
} = require("../controller/cart.controller");
const { auth } = require("../Middleware/auth.middleware");

const router = express.Router();

router.route("/").post(auth, createCart).get(getAllCarts);
router
  .route("/:id")
  .get(getCartById)
  .put(auth, updateCart)
  .delete(auth, deleteCart);

module.exports = router;
