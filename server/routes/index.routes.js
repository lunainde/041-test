//server/routes/index.routes.js
const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.get("/", (req, res, next) => {
  res.json("All good in here");
});
module.exports = router;
