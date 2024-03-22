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

const updateService = async (
    id,
    name,
    username,
    email,
    password,
    avatar,
    background,
) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { name, username, email, password, avatar, background },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return updatedUser;
    } catch (error) {
        throw new Error("Error updating user: " + error.message);
    }
};

module.exports = {
    createService,
    findAllService,
    findUserByIdService,
    updateService,
};
