const mongoose = require('mongoose');
const userService = require('../services/userService');

const validId = (req, res, next) =>{
    let idParam;
    if(!req.params.id){
        req.params.id = req.userId;
        idParam = req.params.id;
    } else {
        idParam = req.params.id;
    }
    
    if (!mongoose.Types.ObjectId.isValid(idParam)) {
        return res.status(400).send({ message: "Invalid id!" });
      }
      next();
};

const validUser = async (req, res, next) =>{
    try {
    const id = req.params.id;

    const user = await userService.findByIdService(id);

    if (!user) {
        return res.status(400).send({ message: "User not Found" });
    }
    req.id = id;
    req.user = user;
    
    next();
    } catch (error){
        res.status(500).send({ message: error.message });
    }
};

module.exports = {validId, validUser}