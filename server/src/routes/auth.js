const express = require("express");
const authRouter = express.Router();
const { login, register } = require("../controllers/user.js");

const isAuthenticated = require("../middlewares/autheticator.js");

authRouter.get("/health", (req, res) => {
  res.json({ status: 200, message: "Everything is working fine!" });
});

authRouter.get("/autheticate", isAuthenticated, (req, res, next) => {
  res.json({ status: 202, message: "Token is valid" });
});

// api for user login
authRouter.post("/login", login);

// api to register a new user
authRouter.post("/register", register);

module.exports = authRouter;
