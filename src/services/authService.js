const User = require('../models/user');

const loginService = (email) => User.findOne({ email: email }).select("+password");

module.exports = { loginService };