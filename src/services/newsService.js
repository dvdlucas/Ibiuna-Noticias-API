const News = require('../models/News');

const createService = (body) => News.create(body);

const findAllService = () => News.find();

const findByIdService = (id) => News.findById(id);


module.exports = {
    createService,
    findAllService,
    findByIdService,
};
