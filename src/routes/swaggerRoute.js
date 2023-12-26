const route = require("express").Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

route.use('/', swaggerUi.serve);
route.get('/', swaggerUi.setup(swaggerDocument));

module.exports = route;