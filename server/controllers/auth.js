import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import nanoid from "nanoid";

require("dotenv").config();

export const signup = async (req, res) => {
  console.log("HIT SIGNUP");
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({ error: "Name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ error: "Email is taken" });
    }

    const hashedPassword = await hashPassword(password);

    try {
      const user = await new User({
        name,
        email,
        password: hashedPassword,
      }).save();

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      const { password: userPassword, ...rest } = user._doc;
      return res.json({ token, user: rest });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "No user found" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.secret = undefined;
    res.json({ token, user });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  console.log("USER ===> ", user);
  if (!user) {
    return res.json({ error: "User not found" });
  }

  const resetCode = nanoid(5).toUpperCase();
  user.resetCode = resetCode;
  user.save();

  // Create Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'YourEmailService', // Replace with your email service provider (e.g., 'gmail', 'hotmail', etc.)
    auth: {
      user: 'your_email@example.com', // Replace with your email
      pass: 'your_email_password', // Replace with your email password
    },
  });

  const emailData = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "Password reset code",
    html: `<h1>Your password reset code is: ${resetCode}</h1>`,
  };

  try {
    // Send email using Nodemailer transporter
    await transporter.sendMail(emailData);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.json({ ok: false });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password, resetCode } = req.body;
    const user = await User.findOne({ email, resetCode });
    if (!user) {
      return res.json({ error: "Email or reset code is invalid" });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetCode = "";
    user.save();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};
