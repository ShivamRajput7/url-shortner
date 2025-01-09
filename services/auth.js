require("dotenv").config();

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const setUser = (user) => {
  const userPayload = { _id: user._id, email: user.email, role: user.role };
  return jwt.sign(userPayload, secret);
};

const getUser = (token) => {
  if (!token) {
    return null;
  }
  return jwt.verify(token, secret);
};

module.exports = { setUser, getUser };
