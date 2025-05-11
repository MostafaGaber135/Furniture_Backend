const Rating = require("../models/rating.model");
const catchAsync = require("../utils/catchAsync.utils");

exports.createRating = catchAsync(async (req, res) => {
  const rating = await Rating.create(req.body);
  res.status(201).json(rating);
});

exports.getAllRatings = catchAsync(async (req, res) => {
  const ratings = await Rating.find().populate("userId");
  res.status(200).json(ratings);
});

exports.getRatingById = catchAsync(async (req, res) => {
  const rating = await Rating.findById(req.params.id).populate("userId");
  res.status(200).json(rating);
});

exports.updateRating = catchAsync(async (req, res) => {
  const rating = await Rating.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(rating);
});

exports.deleteRating = catchAsync(async (req, res) => {
  await Rating.findByIdAndDelete(req.params.id);
  res.status(204).send();
});
