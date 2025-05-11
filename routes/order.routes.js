const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controller/order.controller");
const { auth } = require("../Middleware/auth.middleware");

const router = express.Router();

router.route("/").post(auth, createOrder).get(auth, getAllOrders);
router
  .route("/:id")
  .get(auth, getOrderById)
  .put(auth, updateOrder)
  .delete(auth, deleteOrder);

module.exports = router;
