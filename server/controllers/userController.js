const { userLoginService } = require('../model/userModel');
const { userRegisterService } = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const handleResponse = (res, status, message, data=null) =>{
    res.status(status).json({
        status,
        message,
        data,
    });
};

module.exports.userLogin = async (req, res, next) =>{
    const { login, password } = req.body;
    try{
        const user = await userLoginService(login);
        console.log(user);
        if(!user || user.length == 0){ 
            return handleResponse(res, 404, "User not found");
         }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const accessToken = jwt.sign(
                { "login": user.login },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )
            return handleResponse(res, 200, "Login success", {token: accessToken, user: { login: user.login } });
        }else{
            return handleResponse(res, 401, "Wrong password"); 
        }
    }catch(err){
        next(err);
    }
};

module.exports.userRegister = async (req, res, next) =>{
    const { login, password } = req.body;
    if(!login || !password || login.trim() == '' || password.trim() == ''){
        return handleResponse(res, 404, "Username and password required and cannot be empty");
    }
    try{
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await userRegisterService(login, hashedPass);
        if(!user || user.length == 0){
            return handleResponse(res, 404, "Registration failed");
        }
        return handleResponse(res, 201, "Register success", { login, password });
    }catch(err){
        if(err.code == '23505'){
            return handleResponse(res, 409, "Username exists");
        }
        next(err);
    }
};