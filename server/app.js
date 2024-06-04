//server/app.js
require("dotenv").config();  // https://www.npmjs.com/package/dotenv
require("./db");
const express = require("express");  // https://www.npmjs.com/package/express
const app = express();

//Middleware and configuration
require("./config")(app);

//Start handling routes here
const indexRoutes = require("./routes/index.routes");
    app.use("/api", indexRoutes);

const postsRouter = require("./routes/posts.routes");
    app.use("/api/posts", postsRouter);
const authRoutes = require("./routes/auth.routes");
    app.use("/api/auth", authRoutes);

//Errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
