// controllers/authController.js

const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.isLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
};

exports.getLoginForm = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.userId = user.id;
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
};

exports.getSignupForm = (req, res) => {
  res.render('signup');
};

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  await User.create({ username, password: hashedPassword });
  res.redirect('/login');
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
