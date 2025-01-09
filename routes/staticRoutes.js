const express = require("express");
const { homePage, analyticsPage } = require("../controllers/url");
const upload = require("../middleware/multer");
const router = express.Router();

router.route("/").get(homePage);

router.route("/signup").get((req, res) => {
  return res.render("signup");
});

router.route("/login").get((req, res) => {
  return res.render("login");
});
router.get("/upload", (req, res) => {
  return res.render("uploadfile");
});
router.post("/upload", upload.single("profile"), (req, res) => {
  console.log("Uploaded Image");
  return res.render("uploadfile");
});

module.exports = router;
