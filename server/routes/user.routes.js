//server/routes/user.routes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const userController = require("../controllers/user.controller");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const saltRounds = 10;

////GET ALL USERS
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

//GET LATEST 3 STARTUPS
router.get("/startups", userController.getRecentStartups);

// POST /auth/signup  - Creates a new user in the database
router.post("/signup", (req, res, next) => {
  const { email, password, name } = req.body;

  // Check if email or password or name are provided as empty strings
  if (email === "" || password === "" || name === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }

  // Check that the email is of a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  // Checks password for special characters and minimum length
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      return User.create({ email, password: hashedPassword, name });
    })
    .then((createdUser) => {
      const { email, name, _id } = createdUser;
      const user = { email, name, _id };
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err));
});

// POST /auth/login  - Authenticates a user and generates a JWT token
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "User not found." });
        return;
      }
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
      if (passwordCorrect) {
        const { _id, email, name } = foundUser;
        const payload = { _id, email, name };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err));
});

// GET /auth/verify  - Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log("User Payload:", req.payload); //test what returns
  res.status(200).json(req.payload);
});

// PUT /auth/update  - Update user account
router.put("/update", isAuthenticated, (req, res, next) => {
  const { imgUrl, name, siteUrl, tags, about, country, createdAt } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { imgUrl, name, siteUrl, tags, about, country, createdAt },
    { new: true }
  )
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => next(err));
});

// DELETE /auth/delete  - Delete user account
router.delete("/delete", isAuthenticated, (req, res, next) => {
  const userId = req.user._id;

  User.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).json({ message: "User deleted successfully" });
    })
    .catch((err) => next(err));
});

module.exports = router;
