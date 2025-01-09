const express = require("express");
const router = express.Router();
const { handleUserSignup, handleLoginUser } = require("../controllers/user");
router.route("/").post(handleUserSignup);
router.route("/login").post(handleLoginUser);

module.exports = router;
