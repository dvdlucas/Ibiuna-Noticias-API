const bcrypt = require('bcrypt');
const loginService = require('../services/authService');

const login = async(req, res) => {
    
    try{
    const { email , password }= req.body;
    
    const user = await loginService.loginService(email);

    if(!user){
        return res.status(404).send({message: "User not Found for email"});
   }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

   if(!passwordIsValid || !user){
        return res.status(400).send({message: "Invalid Password"});
   }

    res.send("Login Sucess");
    } catch(error){
        res.status(500).send(error.message);
    }
}

module.exports = { login };