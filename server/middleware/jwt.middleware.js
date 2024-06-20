//server/middleware/jwt.middleware.js

//---------------V1----------------
const { expressjwt: jwt } = require("express-jwt");

// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders, //postman
});

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }
  return null;
}

// Middleware to check if the user owns the resource
const isUserOwner = async (req, res, next) => {
  const userId = req.user._id;
  const resourceId = req.params.userId; // user ID is passed as a parameter
  if (userId !== resourceId) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
};

// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
  isUserOwner,
};



// // ----------V2-------------
// const { expressjwt: jwt } = require("express-jwt");
// const Post = require("../models/Post.model"); // Import the Post model to check ownership

// // Instantiate the JWT token validation middleware
// const isAuthenticated = jwt({
//   secret: process.env.TOKEN_SECRET,
//   algorithms: ["HS256"],
//   requestProperty: "payload",
//   getToken: getTokenFromHeaders,
// });

// // Function used to extract the JWT token from the request's 'Authorization' Headers
// function getTokenFromHeaders(req) {
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.split(" ")[0] === "Bearer"
//   ) {
//     const token = req.headers.authorization.split(" ")[1];
//     return token;
//   }
//   return null;
// }

// // Middleware to check if the user owns the post
// const isPostOwner = async (req, res, next) => {
//   try {
//     const postId = req.params.postId; // Get the post ID from the request parameters
//     const userId = req.payload._id; // Get the user ID from the JWT payload

//     const post = await Post.findById(postId); // Find the post by ID

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" }); // If post not found, return 404
//     }

//     if (post.user.toString() !== userId) {
//       return res.status(403).json({ message: "Unauthorized" }); // If user is not the owner, return 403
//     }

//     next(); // User is the owner, proceed to the next middleware
//   } catch (error) {
//     next(error); // Pass any errors to the error handler
//   }
// };

// module.exports = {
//   isAuthenticated,
//   isPostOwner,
// };