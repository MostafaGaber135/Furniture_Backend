const mailer = require("nodemailer");
require("dotenv").config();

const transport = mailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = (email, otp) => {
  return transport.sendMail({
    from: `"Furniture Shop" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🔐 Your Furniture Shop Verification Code",
    html: `
      <div style="max-width: 600px; margin: auto; border: 1px solid #eee; font-family: Arial, sans-serif; background-color: #f9f9f9;">
        <div style="background-color: #5e6b6a; padding: 20px; text-align: center; color: white;">
          <h1>Furniture Shop</h1>
        </div>
        <div style="padding: 30px; text-align: center;">
          <h2 style="color: #333;">Email Verification</h2>
          <p style="font-size: 16px;">Use the following code to verify your account:</p>
          <div style="font-size: 32px; font-weight: bold; color: #5e6b6a; margin: 20px 0;">${otp}</div>
          <p style="font-size: 14px; color: #999;">This code will expire in 10 minutes.</p>
        </div>
        <div style="background-color: #eee; padding: 10px; text-align: center; font-size: 12px; color: #999;">
          &copy; 2025 Furniture Shop. All rights reserved.
        </div>
      </div>
    `,
  });
};

const sendResetPasswordEmail = (email, otp) => {
  return transport.sendMail({
    from: `"Furniture Shop" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🔑 Your Furniture Shop Password Reset Code",
    html: `
      <div style="max-width: 600px; margin: auto; border: 1px solid #eee; font-family: Arial, sans-serif; background-color: #f9f9f9;">
        <div style="background-color: #5e6b6a; padding: 20px; text-align: center; color: white;">
          <h1>Furniture Shop</h1>
        </div>
        <div style="padding: 30px; text-align: center;">
          <h2 style="color: #333;">Reset Your Password</h2>
          <p style="font-size: 16px;">Use the following code to reset your password:</p>
          <div style="font-size: 32px; font-weight: bold; color: #5e6b6a; margin: 20px 0;">${otp}</div>
          <p style="font-size: 14px; color: #999;">This code will expire in 10 minutes.</p>
        </div>
        <div style="background-color: #eee; padding: 10px; text-align: center; font-size: 12px; color: #999;">
          &copy; 2025 Furniture Shop. All rights reserved.
        </div>
      </div>
    `,
  });
};

module.exports = { sendVerificationEmail, sendResetPasswordEmail };
