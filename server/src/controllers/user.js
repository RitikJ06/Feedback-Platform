const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      let passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
          expiresIn: "2h",
        });
        return res.send({
          status: 200,
          message: "User logged in successfully",
          name: user.name,
          jwtToken,
        });
      }
    }
    res.send({ status: 401, message: "Incorrect credentials" });
  } catch (error) {
    next(new Error("Something went wrong! Please try after some time."));
  }
};

module.exports.register = async (req, res, next) => {
  const { name, email, mobile, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        status: 403,
        message: "User already exists with the provided email",
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      mobile,
      password: encryptedPassword,
    });
    const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    });
    res.send({
      status: 200,
      message: "User created successfully",
      name,
      jwtToken,
    });
  } catch (error) {
    next(new Error("Something went wrong! Please try after some time."));
  }
};
