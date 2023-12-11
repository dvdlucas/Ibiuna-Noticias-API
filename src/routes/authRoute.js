const route = require("express").Router();
const authController = require("../controllers/authController");


route.post('/', authController.login);


module.exports = route;