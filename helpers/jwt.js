const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports.getAccessToken = (user) => {
  // Generate JWT Token
  const SECRET_KEY = process.env.JWT_SECRET || config.jwt.secretKey;
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: `1h` }
  );
};
