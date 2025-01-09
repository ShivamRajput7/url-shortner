const express = require("express");
const {
  handleGenrateUrl,
  handleRedirectUrl,
  urlRedirect,
} = require("../controllers/url");
const router = express.Router();

router.route("/").post(handleGenrateUrl);
router.route("/").get(urlRedirect);
router.route("/:id").get(handleRedirectUrl);

module.exports = router;
