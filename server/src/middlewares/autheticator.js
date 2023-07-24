const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const user = jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY);
    req.user = user;
  } catch (error) {
    return res.json({ status: 401, message: "Please login first" });
  }
  next();
};

module.exports = isAuthenticated;