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

//GET LAST 3 RECENT USERS- STARTUP
exports.getRecentStartups = async (req, res, next) => {
  try {
    const users = await User.find({ category: "Startup" })
      .sort({ createdAt: -1 })
      .limit(3);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// exports.getUserById = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     res.status(200).json(user);
//   } catch (err) {
//     next(err);
//   }
// };
