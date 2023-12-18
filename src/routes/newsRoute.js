const route = require("express").Router();
const newsController = require("../controllers/newsController");
const { authMiddleware } = require("../middleware/authMiddlewares");

route.post('/',authMiddleware, newsController.create);
route.get('/', newsController.findAll);
route.get('/top', newsController.topNews);
route.get('/search', newsController.searchByTitle);
route.get('/findByUser', authMiddleware , newsController.findByUser);
route.get('/:id', authMiddleware , newsController.findById);

module.exports = route;