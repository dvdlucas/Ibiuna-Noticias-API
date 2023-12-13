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

    }


const findAll = async (req, res) => {
    try {
        const news = await newsService.findAllService();
    
        if (news.lenght === 0) {
            return res.status(400).send({ message: "There are no registered news" });
        }
        res.send(news)
        } catch(error){
            res.status(500).send({ message: error.message });
        }
}


module.exports = { create, findAll }