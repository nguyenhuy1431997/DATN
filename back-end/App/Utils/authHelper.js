const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function encode(secret) {
  return crypto
    .createHmac("sha256", secret)
    .update("phunc")
    .digest("hex");
}

function generateToken(userId) {
  return jwt.sign(
    {
      userId: userId,
      timestamp: new Date().getTime()
    },
    Env.APP_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = { encode, generateToken };
