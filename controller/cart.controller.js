const Cart = require("../models/cart.models");
const catchAsync = require("../utils/catchAsync.utils");

exports.createCart = catchAsync(async (req, res) => {
  const cart = await Cart.create(req.body);
  res.status(201).json(cart);
});

exports.getAllCarts = catchAsync(async (req, res) => {
  const carts = await Cart.find()
    .populate("userId")
    .populate("products.productId");
  res.status(200).json(carts);
});

exports.getCartById = catchAsync(async (req, res) => {
  const cart = await Cart.findById(req.params.id)
    .populate("userId")
    .populate("products.productId");
  res.status(200).json(cart);
});

exports.updateCart = catchAsync(async (req, res) => {
  const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(cart);
});

exports.deleteCart = catchAsync(async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.status(204).send();
});
