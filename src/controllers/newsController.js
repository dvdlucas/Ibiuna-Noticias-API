const newsService = require('../services/newsService');
const ObjectId = require('mongoose');

const create = async (req, res) => {
    try {
       const { title, text, banner } = req.body;

       if (!title || !text || !banner ) {
        return res.status(400).send({ 
            message: "Submit all fields for registration" });
        }

        await newsService.createService({
            title,
            text,
            banner,
            user: req.userId,
        });
    res.send(201)
    } catch (error){
            res.status(500).send({ messsage: error.message });
        }

};

const findAll = async (req, res) => {
    try {
        let {limit, offset} = req.query;

        limit = Number(limit);
        offset = Number(offset);

        if(!limit){
            limit = 5;
        }
        if(!offset){
            offset = 0;
        }

        const news = await newsService.findAllService(offset, limit);
        const total = await newsService.countNews();
        const currentUrl = req.baseUrl;

        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

        if (news.length === 0) {
            return res.status(400).send({ message: "There are no registered news" });
        }
        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar,
            })),
        });
        } catch(error){
            res.status(500).send({ message: error.message });
        }
};

const topNews = async (req, res) => {
    try {
    const news = await newsService.topNewsService();

    if(!news){
        return res.status(400).send({ message: "There is no registered post" });
    }
    res.send({
        news: {
            id: news._id,
            title: news.title,
            text: news.text,
            banner: news.banner,
            likes: news.likes,
            comments: news.comments,
            name: news.user.name,
            username: news.user.username,
            userAvatar: news.user.avatar,
        }
    });
    } catch(error){
    res.status(500).send({ message: error.message });
}
};

const findById = async (req, res) => {
    try{
    const { id } = req.params;

    const news = await newsService.findByIdService(id);

    
    if(!news){
        return res.status(400).send({ message: "There is no registered post" });
    }
    return res.send({
        news: {
            id: news._id,
            title: news.title,
            text: news.text,
            banner: news.banner,
            likes: news.likes,
            comments: news.comments,
            name: news.user.name,
            username: news.user.username,
            userAvatar: news.user.avatar,
        },
    });

    } catch(error){
        res.status(500).send({ message: error.message });
    }

};

const searchByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        const news = await newsService.searchByTitleService(title);
     
        if (news.length === 0) {
            return res.status(400).send({ message: "There are no news with this title" });
        }
        return res.send({
            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar,
            })),
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const findByUser = async (req, res) => {
    try {
        const id = req.userId;

        const news = await newsService.findByUserService(id);
    
        
        if(news.lenght === 0){
            return res.status(400).send({ message: "There are no news with this user" });
        }
        return res.send({
            results: news.map(item => ({
            id: item._id,
            title: item.title,
            text: item.text,
            banner: item.banner,
            likes: item.likes,
            comments: item.comments,
            name: item.user.name,
            username: item.user.username,
            userAvatar: item.user.avatar,
        })),
    });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const {title, text, banner} = req.body;
        const {id} = req.params;

    if (!title && !text && !banner ) {
            return res.status(400).send({ 
                message: "Submit all fields for registration" });
    }
    const news = await newsService.findByIdService(id);

    if(news.user._id != req.userId){
        return res.status(400).send({ 
            message: "You didn't update this news" });
    }

    await newsService.updateService(id, title, text, banner);

    return res.send({
        message: "News sucessfully updated"
    });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const erase = async (req, res) => {
    try {
        const {id} = req.params;

        const news = await newsService.findByIdService(id);
        if(news.user._id != req.userId){
            return res.status(400).send({ 
                message: "You didn't delete this post" });
        }

    await newsService.eraseService(id);

    return res.send({
        message: "News sucessfully deleted"
    });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }

};

const likeNews = async (req, res) => {
    try{
    const { id } = req.params;
    const userId = req.userId;

    const newsLiked = await newsService.likeNewsService(id, userId);
        if(!newsLiked){
            await newsService.deleteLikeService(id, userId);
            return res.status(200).send({ message: "Like remove sucessfully"});
        };
        res.send({ message: "Like done successfully"});
    } catch (error){
        res.status(500).send({ message: error.message })
    }
};

const AddComment = async (req, res) => {
    try{
    const { id } = req.params;
    const userId = req.userId;
    const { comment } = req.body;

    if(!comment){
        return res.status(404).send({ message: "Write a message to comment"}) 
    }
        await newsService.addCommentService(id, userId, comment);
            res.send({ message: "Comment done successfully"});
    } catch (error){
        res.status(500).send({ message: error.message })
    }
};

const RemoveComment = async (req, res) => {
    try{
    const userId = req.userId;
    const { idNews, idComment } = req.params;
 
       const commentDelete = await newsService.RemoveCommentService(idNews, userId, idComment);

       const commentFinder = commentDelete.comments.find( (comment) => comment.idComment === idComment);

       if(!commentFinder){
        return res.status(404).send({ message: "Comment  dont  exists!"})
       }


       if(commentFinder.userId !== userId){
        return res.status(400).send({
            message: "You cant delete this comments"
        })
       }
            res.send({ message: "Comment removed successfully"});
    } catch (error){
        res.status(500).send({ message: error.message })
    }
};


module.exports = { create, findAll, topNews, findById , searchByTitle, findByUser, update, erase, likeNews, AddComment, RemoveComment}