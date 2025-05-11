const Order = require("../models/order.models");
const catchAsync = require("../utils/catchAsync.utils");

exports.createOrder = catchAsync(async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json(order);
});

exports.getAllOrders = catchAsync(async (req, res) => {
  const orders = await Order.find()
    .populate("userId")
    .populate("products.productId");
  res.status(200).json(orders);
});

exports.getOrderById = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("userId")
    .populate("products.productId");
  res.status(200).json(order);
});

exports.updateOrder = catchAsync(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(order);
});

exports.deleteOrder = catchAsync(async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.status(204).send();
});
