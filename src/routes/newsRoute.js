const route = require("express").Router();
const newsController = require("../controllers/newsController");
const { authMiddleware } = require("../middleware/authMiddlewares");

route.post('/',authMiddleware, newsController.create);
route.get('/', newsController.findAll);
route.get('/top', newsController.topNews);
route.get('/search', newsController.searchByTitle);
route.get('/findByUser', authMiddleware , newsController.findByUser);
route.get('/:id', authMiddleware , newsController.findById);
route.patch('/:id', authMiddleware ,newsController.update);
route.delete('/:id', authMiddleware ,newsController.erase);
route.patch('/like/:id', authMiddleware, newsController.likeNews);
route.patch('/comment/:id', authMiddleware, newsController.AddComment);
route.patch('/comment/:idNews/:idComment', authMiddleware, newsController.RemoveComment);

module.exports = route;