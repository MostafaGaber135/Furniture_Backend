const Product = require("../models/product.models");
const catchAsync = require("../utils/catchAsync.utils");

exports.createProduct = catchAsync(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find()
    .populate("categories.main")
    .populate("categories.sub")
    .populate("orderId");
  res.status(200).json(products);
});

exports.getProductById = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("categories.main")
    .populate("categories.sub")
    .populate("orderId");
  res.status(200).json(product);
});

exports.updateProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(product);
});

exports.deleteProduct = catchAsync(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
});
