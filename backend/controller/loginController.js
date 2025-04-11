import Employ from "../models/employModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import jwt from "jsonwebtoken";

export const getInfo = asyncHandler(async (req, res) => {
  const users = await Employ.find();

  if (users.length > 0) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error("No users found");
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password, web } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide both email and password");
  }

  const user = await Employ.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      _id: user._id,
      email: user.email,
      web: web,
      role_name: user.role_name,
      token,
      message: "Login successful",
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
