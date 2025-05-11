const userModel = require("../models/user.models.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync.utils");
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../utils/mailer.utils");
const generateOtp = require("../utils/generateOtp.utils");

exports.register = catchAsync(async (req, res) => {
  const { userName, email, password, role, phone, address } = req.body;
  const imageUrl =
    req.file?.path ||
    "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg";

  const existingUser = await userModel.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "Email already exists" });

  const otp = generateOtp();

  const newUser = await userModel.create({
    userName: { en: userName.en, ar: userName.ar },
    email,
    password,
    image: imageUrl,
    role,
    phone,
    address: { en: address.en, ar: address.ar },
    verificationToken: otp,
  });

  await sendVerificationEmail(email, otp);
  res
    .status(202)
    .json({
      message: "Check your email and enter the verification code",
      user: newUser,
    });
});

exports.verifyEmail = catchAsync(async (req, res) => {
  const { otp } = req.body;
  const user = await userModel.findOne({ verificationToken: otp });
  if (!user)
    return res.status(400).json({ message: "Invalid verification code" });

  user.verified = true;
  user.verificationToken = undefined;
  await user.save();
  res.status(200).json({ message: "Email verified successfully" });
});

<<<<<<< HEAD

exports.login = catchAsync(async (req, res, next) => {
  //  let{email,password}= req.body;
  let email = req.body.email || req.body.Email;
  let password = req.body.password || req.body.password;
  console.log('req.body:', req.body);
=======
exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: "Invalid email or password" });
>>>>>>> 558d9e0 (first commit)

  if (!user.verified)
    return res.status(401).json({ message: "Please verify your email first" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.status(200).json({ token, user });
});

exports.refreshToken = catchAsync(async (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.status(200).json({ token });
});

exports.logout = catchAsync(async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

exports.forgotPassword = catchAsync(async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = generateOtp();
  user.resetPasswordToken = otp;
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  await sendResetPasswordEmail(user.email, otp);
  res.status(200).json({ message: "Reset code sent to your email" });
});

exports.resetPassword = catchAsync(async (req, res) => {
  const { otp, password } = req.body;
  const user = await userModel.findOne({
    resetPasswordToken: otp,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user)
    return res.status(400).json({ message: "Invalid or expired reset code" });

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.status(200).json({ message: "Password has been reset successfully" });
});
