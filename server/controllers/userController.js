const { userLoginService } = require('../model/userModel')
const { userRegisterService } = require('../model/userModel')

const handleResponse = (res, status, message, data=null) =>{
    res.status(status).json({
        status,
        message,
        data,
    });
};

module.exports.userLogin = async (req, res, next) =>{
    const { username, password } = req.body;
    try{
        const user = await userLoginService(username, password);
        if(!user || user.length == 0){ 
            return handleResponse(res, 404, "User not found");
         }
         return handleResponse(res, 200, "Login success", { username, password });
        //return handeResponse(res, 200, "Login succes", user); 
        //  return res.json({
        //     username,
        //     password,
        //     isSuccess: true,
        // });
    }catch(err){
        next(err);
    }
};

module.exports.userRegister = async (req, res, next) =>{
    const { username, password } = req.body;
    if(!username || !password || username.trim() == '' || password.trim() == ''){
        return handleResponse(res, 404, "Username and password required and cannot be empty");
    }
    try{
        const user = await userRegisterService(username, password);
        if(!user || user.length == 0){
            return handleResponse(res, 404, "Registration failed");
        }
        return handleResponse(res, 201, "Register success", { username, password });
    }catch(err){
        if(err.code == '23505'){
            return handleResponse(res, 409, "Username exists");
        }
        next(err);
    }
}