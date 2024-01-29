const route = require("express").Router();
const userController = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddlewares");
const { validId, validUser } = require('../middleware/globalMiddlewares');

route.post('/create', userController.create);
route.use(authMiddleware);
route.get('/', userController.findAll);
route.use(validId);
route.get('/findById/:id?',  userController.findUserByIdController);
route.patch('/:id', userController.update);

module.exports = route;