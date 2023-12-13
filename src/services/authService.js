const User = require('../models/user');
const jwt = require('jsonwebtoken');

const loginService = (email) => User.findOne({ email: email }).select("+password");

const generateToken = (id) => jwt.sign({ id : id}, process.env.SECRET_JWT, {expiresIn: 86400});

module.exports = { loginService ,generateToken };