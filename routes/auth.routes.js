const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  register,
  login,
  refreshToken,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controller/auth.controller.js");
const { auth } = require("../Middleware/auth.middleware");
const upload = require("../utils/multer.utils.js");

router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.post("/refreshToken", refreshToken);
router.get("/verify/:token", verifyEmail);
router.post("/logout", auth, logout);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.status(200).json({ message: "Google Login Successful", user: req.user });
  }
);

// Forgot Password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
