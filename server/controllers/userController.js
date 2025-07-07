const { userLoginService, userRegisterService, addMovie, addMovieToWatchlist, checkIfMovieExist, getWatchlist, updateWatchlist } = require('../model/userModel');
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
                { expiresIn: '30s' }
            )

            const refreshToken = jwt.sign(
                { "login": user.login },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            )
            res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000});

            return handleResponse(res, 200, "Login success", {token: accessToken, user: user.login  });
        }else{
            return handleResponse(res, 401, "Wrong password");
        }
    }catch(err){
        next(err);
    }
};


module.exports.userRegister = async (req, res, next) =>{
    const { login, password } = req.body;
    console.log(req.body);
    console.log(login);
    console.log(password);
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



module.exports.addToWatchlist = async (req, res, next) =>{
    console.log("JESTEŚMY TUUU!!!!!");
    const login = req.user;
    const { movieId, data } = req.body;
    console.log(data);
    if(!movieId) {
        return handleResponse(res, 400, "No movie id sended");
    }
    try{
        let movieExist = await checkIfMovieExist(movieId);

        if(!movieExist){
            await addMovie(movieId, data);
        }
        await addMovieToWatchlist(login, movieId);   
        return handleResponse(res, 201, "Added to watchlist successfully");
    }catch(err){
        if(err.code == "23505"){
            return handleResponse(res, 409, "Movie already exist in user watchlist");
        }
        next(err);
    }
};

//GETING WATCHLIST - TO TEST
module.exports.getWatchlist = async (req, res, next) => {
    const login = req.user;
    try {
        const result = await userLoginService(login);
        if (!result || result.length == 0) {
            return handleResponse(res, 404, "User not found");
        }
        const userId = result.id;
        //const watchlistResult = await pool.query("SELECT * FROM watchlist WHERE user_id = $1", [userId]);
        const watchlist = await getWatchlist(userId);
        return handleResponse(res, 200, "Watchlist retrieved successfully", watchlist);
    } catch (err) {
        next(err);
    }
};


module.exports.updateWatchlist = async (req, res, next) => {
    console.log("TEST", req.body);
    const login = req.user;
    const { movies } = req.body;
    console.log("MOVIES", movies);
    if (!movies || movies.length === 0) {
        return handleResponse(res, 400, "No movies provided for update");
    }
    try{
        const result = await userLoginService(login);
        if (!result || result.length == 0) {
            return handleResponse(res, 404, "User not found");
        }
        const userId = result.id;

        await updateWatchlist(userId, movies);
        return handleResponse(res, 200, "Watchlist updated successfully");
    }catch(err){
        next(err);
    }
};