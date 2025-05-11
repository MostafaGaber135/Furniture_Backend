const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
<<<<<<< HEAD
let userSchema = mongoose.Schema(
=======

const userSchema = new mongoose.Schema(
>>>>>>> 558d9e0 (first commit)
  {
    userName: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, minlength: 6, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    phone: String,
    address: {
      en: { type: String },
      ar: { type: String },
    },
    image: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    },
    googleId: String,
    verified: { type: Boolean, default: false },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
<<<<<<< HEAD
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }


=======
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
>>>>>>> 558d9e0 (first commit)
  next();
});

module.exports = mongoose.model("User", userSchema);
