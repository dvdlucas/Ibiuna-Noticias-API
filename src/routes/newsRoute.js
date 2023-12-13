const route = require("express").Router();
const newsController = require("../controllers/newsController");
const { authMiddleware } = require("../middleware/authMiddlewares");

route.post('/',authMiddleware, newsController.create);
route.get('/', newsController.findAll);

module.exports = route;