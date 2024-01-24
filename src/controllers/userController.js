const userService = require('../services/userService');
const loginService = require('../services/authService');

const create = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
        return res.status(400).send({ message: "Submit all fields for registration" })
    }

    const user = await userService.createService(req.body);

    if (!user) {
        return res.status(400).send({ message: "Error creating User" });
    }
    const token = loginService.generateToken(user.id);
    res.status(201).send({
        message: "User created sucessfully",
        token: token,
    });
} catch (error){
    res.status(500).send({ messsage: error.message });
}
};

const findAll = async (req, res) => {
    try {
    const users = await userService.findAllService();

    if (users.lenght === 0) {
        return res.status(400).send({ message: "There are no registered users" });
    }
    res.send(users)
    } catch(error){
        res.status(500).send({ message: error.message });
    }
};

const findById = async (req, res) => {
    try {
    const user = req.user;
    res.send(user)
    }catch (error){
        res.status(500).send({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
    const { name, username, email, password, avatar, background } = req.body;
    
    if (!name && !username && !email && !password && !avatar && !background) {
        return res.status(400).send({ message: "Submit at least one fields for update" })
    }

   const {id, user} = req;

    await userService.updateService(
        id,
        name,
        username,
        email,
        password,
        avatar,
        background,
    );
    res.send({message: "User successfully updated!"});
    }catch (error){
        res.status(500).send({ message: error.message });
    }
};
    



module.exports = { create, findAll, findById, update };