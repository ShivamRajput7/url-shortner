const Url = require("../models");
const { getUser } = require("../services/auth");
const { generateShortId } = require("../shortId");
const { localUrlIP } = require("../url");

// url shortner
const handleGenrateUrl = async (req, res) => {
  //user login checker
  if (req.cookies?.uid) {
    const user = getUser(req.cookies.uid);
    req.user = user;
    console.log(user);
  } else {
    req.user = "";
  }
  const shortUrlID = generateShortId(6);
  const body = await req.body;
  const url = await body.url;
  if (!body || !url) {
    return res.redirect("/");
  }

  const result = await Url.create({
    shortUrl: shortUrlID,
    redirectUrl: url,
    createdBy: req.user?._id,
  });

  return res.render("home", { id: result.shortUrl, localUrlIP: localUrlIP });
};

// handle Url redirection
const handleRedirectUrl = async (req, res) => {
  const result = await Url.findOneAndUpdate(
    { shortUrl: req.params.id },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    },
    { new: true }
  );

  if (!result || !result.redirectUrl) {
    return res.render("notFound");
  }

  // Redirect to the actual URL
  return res.redirect(result.redirectUrl);
};

const homePage = async (req, res) => {
  return res.render("home", {
    localUrlIP: localUrlIP,
  });
};

const analyticsPage = async (req, res) => {
  if (req.user.role == "1") {
    const allUrls = await Url.find({}).populate("createdBy");

    return res.render("analytics", {
      urls: allUrls,
      localUrlIP: localUrlIP,
      userRole: req.user.role,
    });
  } else {
    const allUrls = await Url.find({ createdBy: req.user._id });
    return res.render("analytics", {
      urls: allUrls,
      localUrlIP: localUrlIP,
      userRole: req.user.role,
    });
  }
};

const urlRedirect = async (req, res) => {
  return res.redirect("/");
};

module.exports = {
  handleGenrateUrl,
  handleRedirectUrl,
  homePage,
  analyticsPage,
  urlRedirect,
};
