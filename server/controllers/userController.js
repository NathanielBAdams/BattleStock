const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = async (req, res, next) => {
  // Store hash in your password DB.
  try {
    res.locals.verified = false;
    const { username, password } = req.body;

    const newUser = {
      username: username,
      password: password,
      favs: []
    };

    const user = await User.create(newUser);
    res.locals.username = user.username;
    res.locals.verified = true;
    return next();
  } catch (error) {
    return next();
  }
};

userController.verifyUser = async (req, res, next) => {
  res.locals.verified = false;
  console.log(req.body, 'request body');
  const { username, password } = req.body;

  try {
    // find the user with the associated username
    const user = await User.findOne({ username: username, password: password });
    console.log('user found!', user);

    // if password worked, save the user and move on
    res.locals.username = user.username;
    res.locals.verified = true;
    res.locals.favs = user.favs;
    return next();
  } catch (err) {
    return next();
  }
};

module.exports = userController;
