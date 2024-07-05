const UserRepositories  = require('../Repositories/UserRepositories');
const User = require('../models/User');

const createService = (body) => User.create(body);

const findAllService = () => User.find();

async function findUserByIdService(userIdParam, userIdLogged){
    let idParam;
    if(!userIdParam){
        userIdParam = userIdLogged;
        idParam = userIdParam;
    } else {
        idParam = userIdParam;
    }
    if(!idParam)
    throw new Error("Send an id in the parameters to search for the user");
    const user = await UserRepositories.findByIdUserRepository(idParam);
    if(!user) throw new Error("user not found");
    return user;
}

const updateService = (
    id,
    name,
    username,
    email,
    password,
    avatar,
    background,
) => User.findOneAndUpdate(
    { _id: id }, 
    { name,username,email,password,avatar,background,}
    );

module.exports = {
    createService,
    findAllService,
    findUserByIdService,
    updateService,
};
