const User = require('../models/User');

const findByEmailUserRepository = (email) => User.findOne({ email: email });

const findByIdUserRepository = (idUser) => User.findById(idUser);

module.exports = {
    findByEmailUserRepository,
    findByIdUserRepository,
  };