const express = require("express");
const { analyticsPage } = require("../controllers/url");
const router = express.Router();
const { allowTo } = require("../middleware/auth");
router.get("/", allowTo(), analyticsPage);

module.exports = router;
