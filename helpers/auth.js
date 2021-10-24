const jwt = require("jsonwebtoken");
const config = require("../config");
const { AuthenticationError } = require("apollo-server");

module.exports.verifyAndReturnUser = (context) => {
  // context will contain multiple values.
  // We are concerned with the header
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Extract token from Bearer
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        //Verify and return.
        return jwt.verify(token, config.jwt.secretKey);
      } catch (err) {
        throw new AuthenticationError("Authentication failed");
      }
    }
    throw new Error("Authentication token must be in 'Bearer [token]' format");
  }
  throw new Error("Authorization header must be provided");
};
