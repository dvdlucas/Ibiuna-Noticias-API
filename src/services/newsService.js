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

const likeNewsService = (idNews, userId) => News.findOneAndUpdate(
    { _id: idNews, "likes.userId": {$nin: [userId]} }, 
    {$push: {likes: {userId, created: new Date()}}}
);

const deleteLikeService = (idNews, userId) => News.findOneAndUpdate(
    {_id: idNews},
    { $pull: {likes: {userId}}}
);

const addCommentService = (idNews, userId, comment) => {
    const idComment = Math.floor(Date.now() * Math.random()).toString(15);
    return News.findOneAndUpdate({_id: idNews},
     {$push: {comments: {idComment, userId, comment, createAt: new Date()}}}   );
}

const RemoveCommentService = (idNews, userId, idComment) =>
     News.findOneAndUpdate(
        {_id: idNews},
        {$pull: {comments: {idComment, userId}}}
     );



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
    likeNewsService,
    deleteLikeService,
    addCommentService,
    RemoveCommentService,
};
