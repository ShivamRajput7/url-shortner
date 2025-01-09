const User = require("../models/user");
const { setUser } = require("../services/auth");
const { localUrlIP } = require("../url");
const { v4: uuidv4 } = require("uuid");
const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ status: "All fields are required" });
  }

  try {
    // Create the user with hashed password
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // Send a success response or render home page
    return res.redirect("/");
  } catch (error) {
    // Handle errors (e.g., user already exists or database issues)
    console.error(error);
    return res
      .status(500)
      .json({ status: "Server error, please try again later" });
  }
};

const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.redirect("/login");
    // return res.json({ error: "Something went wrong" });
  }
  const token = setUser(user);
  res.cookie("uid", token);

  return res.redirect("/");
};
module.exports = { handleUserSignup, handleLoginUser };
