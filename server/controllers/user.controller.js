
//server/controllers/user.controller.js
const User = require("../models/User.model");

// Function to get user by ID
exports.getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    throw new Error("Error fetching user");
  }
};