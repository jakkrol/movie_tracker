const pool = require("../config/db");

module.exports.userLoginService = async (login) => {
    const result = await pool.query("SELECT * FROM users where login = $1", [login]);
    return result.rows[0];
}

module.exports.userRegisterService = async (username, password) => {
    const result = await pool.query("INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *", [username, password]);
    return result.rows[0];
}

