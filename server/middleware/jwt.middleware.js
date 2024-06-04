//server/middleware/jwt.middleware.js
const { expressjwt: jwt } = require("express-jwt");

// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
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
  const resourceId = req.params.userId; // Assuming the user ID is passed as a parameter
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