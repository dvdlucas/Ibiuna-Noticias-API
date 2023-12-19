const News = require('../models/News');

const createService = (body) => News.create(body);

const countNews = () => News.countDocuments();

const findAllService = (offset, limit) => News.find().sort({ _id: -1}).skip(offset).limit(limit).populate("user");

const findByIdService = (id) => News.findById(id).populate("user");

const topNewsService = () => News.findOne().sort({ _id: -1 }).populate("user");

const searchByTitleService = (title) => News.find({
     title: { $regex: title || "", $options: "i" }, }).sort({ _id: -1 }).populate("user");

const findByUserService = (id) => News.find({user: id}).sort({ _id: -1 })
.populate("user");

const updateService = (id, title, text, banner) => News.findOneAndUpdate({ _id: id}, {title, text, banner}, {
    rawResult: true,
}
);

const eraseService = (id) => News.findByIdAndDelete({ _id: id});

module.exports = {
    createService,
    findAllService,
    findByIdService,
    countNews,
    topNewsService,
    searchByTitleService,
    findByUserService,
    updateService,
    eraseService,
};
