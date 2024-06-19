//server/routes/auth.routes.js
const express = require("express");
const router = express.Router();
//Handles password encryption
const bcrypt = require("bcrypt");
//Handles password encryption
const jwt = require("jsonwebtoken");
// Require the USER MODEL in order to interact with the database
const User = require("../models/User.model");
// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// POST/CREATE signup  - Creates a new user in the database
router.post("/signup", (req, res, next) => {
  const {
    email,
    category,
    tags,
    siteUrl,
    about,
    country,
    imgUrl,
    headline,
    password,
    name,
  } = req.body;

  // Check if email or password or name are provided as empty strings
  if (
    email === "" ||
    password === "" ||
    name === "" ||
    category === "" ||
    tags === "" ||
    siteUrl === "" ||
    about === "" ||
    country === "" ||
    imgUrl === "" ||
    headline === ""
  ) {
    res
      .status(400)
      .json({ message: "Please provide the missing information" });
    return;
  }

  //This regular expression check that the email is of a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Please provide a valid email address." });
    return;
  }
  // This regular expression checks password for special characters and minimum length
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  // Check for DUPLICATED email
  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }
      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      // Create the new user in the database
      // We return a pending promise, which allows us to chain another `then`

      return User.create({
        email,
        category,
        tags,
        siteUrl,
        about,
        country,
        imgUrl,
        headline,
        password: hashedPassword,
        name,
      });
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password => never expose passwords publicly
      const { email, name, _id } = createdUser;
      // Create a new object that doesn't expose the password
      const user = { email, name, _id };
      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// POST login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        console.log("what");
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
      }

      console.log(foundUser.password);

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, name, imgUrl, headline } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email, name, imgUrl, headline };

        // Create a JSON Web Token and sign it
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log("diogo");
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
   console.log(`req.payload`, req.payload);

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

// PUT/UPDATE '/auth/update' => update user account
router.put("/update", isAuthenticated, (req, res, next) => {
  const { imgUrl, siteUrl, headline, country, about, email, name, category, tags } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { imgUrl, name, siteUrl, tags, about, country },
    { new: true }
  )
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => next(err));
});

// DELETE '/auth/delete' => Delete user account
router.delete("/delete", isAuthenticated, (req, res, next) => {
  const userId = req.user._id;
  User.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).json({ message: "User deleted successfully" });
    })
    .catch((err) => next(err));
});

module.exports = router;
