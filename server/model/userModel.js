const pool = require("../config/db");

module.exports.userLoginService = async (username, password) => {
    const result = await pool.query("SELECT * FROM users where login = $1 AND password = $2", [username, password]);
    return result.rows;
}

module.exports.userRegisterService = async (username, password) => {
    console.log("we here");
    const result = await pool.query("INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *", [username, password]);
    return result.rows;
}

