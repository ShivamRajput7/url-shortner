const { getUser } = require("../services/auth");

const loginCheck = async (req, res, next) => {
  try {
    const userUid = req.cookies?.uid;
    if (!userUid) {
      return next();
    }
    const user = await getUser(userUid);
    if (!user) {
      return next();
    }
    req.user = user;

    next();
  } catch (error) {
    console.error("Error in loginCheck middleware:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const allowTo = () => {
  return (req, res, next) => {
    if (!req.user) return res.redirect("/login");
    // if (!roles.includes(req.user.role)) return res.end("UnAuthrized");
    return next();
  };
};

module.exports = { loginCheck, allowTo };
