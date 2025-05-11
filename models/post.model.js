const mongoose = require("mongoose");

<<<<<<< HEAD
const postSchema = new mongoose.Schema({
  image: String,
  title: {
    en: String,
    ar: String,
=======
const postSchema = new mongoose.Schema(
  {
    image: { type: String },
    title: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    description: {
      en: { type: String, maxlength: 255 },
      ar: { type: String, maxlength: 255 },
    },
    content: {
      en: { type: String },
      ar: { type: String },
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: String,
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
>>>>>>> 558d9e0 (first commit)
  },
  description: {
    en: String,
    ar: String,
  },
  content: {
    en: String,
    ar: String,
  },
  author: String,

  likes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: String,

    },
  ],
  
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
