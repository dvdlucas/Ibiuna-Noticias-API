const News = require('../models/News');

const createService = (body) => News.create(body);

const countNews = () => News.countDocuments();

const findAllService = (offset, limit) => News.find().sort({ _id: -1}).skip(offset).limit(limit).populate("user");

const findByIdService = (id) => News.findById(id).populate("user");

const topNewsServices = () => News.findOne().sort({ _id: -1 }).populate("user");


module.exports = {
    createService,
    findAllService,
    findByIdService,
    countNews,
    topNewsServices,
};
