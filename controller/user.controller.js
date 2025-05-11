<<<<<<< HEAD
const userModel = require("../models/user.models.js");
const ApiError = require("../utils/ApiError.utils.js");
const catchAsync = require("../utils/catchAsync.utils.js");
const bcrypt = require("bcryptjs");

exports.getAllUser = catchAsync(async (req, res, next) => {
  let users = await userModel.find();
  if (users.length === 0) {
    return res.status(404).json({ message: "users do Not Exist" });
  }

  const newUsers = users.map((user) => user.toObject());

  res.status(200).json({ message: "success", users: newUsers });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let user = await userModel.findById(id);
  if (!user) {
    return next(new ApiError(404, "User does not found"));
  }

  res.status(200).json({ message: "success", user: user.toObject() });
});

exports.deleteUserById = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  await userModel.findByIdAndDelete(id);
  res.status(204).json();
});

exports.updateUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log("Incoming update body:", req.body);

  let { phone, address, userName, ...rest } = req.body;

  try {
    if (typeof userName === "string") userName = JSON.parse(userName);
    if (typeof address === "string") address = JSON.parse(address);
  } catch (err) {
    return next(new ApiError(400, "Invalid JSON in userName or address"));
  }

  if (phone && !/^(011|010|012|015)[0-9]{8}$/.test(phone)) {
    return next(new ApiError(400, "Invalid phone number format"));
  }

  if (address?.en && address.en.length < 2) {
    return next(
      new ApiError(400, "Address (EN) must be at least 2 characters")
    );
  }

  if (address?.ar && address.ar.length < 2) {
    return next(
      new ApiError(400, "Address (AR) must be at least 2 characters")
    );
  }

  const updatedData = { ...rest };

  if (phone) updatedData.phone = phone;
  if (address?.en) updatedData["address.en"] = address.en;
  if (address?.ar) updatedData["address.ar"] = address.ar;
  if (userName?.en) updatedData["userName.en"] = userName.en;
  if (userName?.ar) updatedData["userName.ar"] = userName.ar;
  if (req.file) {
    updatedData.image = req.file.path;
  }

  const updatedUser = await userModel.findByIdAndUpdate(id, updatedData, {
=======
const User = require("../models/user.models");
const catchAsync = require("../utils/catchAsync.utils");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find().populate("wishlist");
  res.status(200).json(users);
});

exports.getUserById = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id).populate("wishlist");
  res.status(200).json(user);
});

exports.updateUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
>>>>>>> 558d9e0 (first commit)
    new: true,
  });
<<<<<<< HEAD

  if (!updatedUser) {
    return next(new ApiError(404, "User not found"));
  }

  res
    .status(200)
    .json({ message: "User updated successfully", user: updatedUser.toObject() });
});



exports.changePassword = catchAsync(async (req, res, next) => {
  const id = req.id;
  const { oldPassword, newPassword, confirmPassword } = req.body;
=======
  res.status(200).json(user);
});

exports.deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});
>>>>>>> 558d9e0 (first commit)

// wishlist
exports.addToWishlist = catchAsync(async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.wishlist.includes(productId)) user.wishlist.push(productId);
  await user.save();
  res.status(200).json(user);
});

exports.removeFromWishlist = catchAsync(async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
  await user.save();
  res.status(200).json(user);
});
