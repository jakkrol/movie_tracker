const pool = require("../config/db");

module.exports.userLoginService = async (login) => {
    const result = await pool.query("SELECT * FROM users WHERE login = $1", [login]);
    return result.rows[0];
}

module.exports.userRegisterService = async (login, password) => {
    const result = await pool.query("INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *", [login, password]);
    return result.rows[0];
}


module.exports.checkIfMovieExist = async (movieId) => {
    const result = await pool.query("SELECT * FROM movies WHERE movie_id = $1", [movieId]);
    return result.rows[0];
}

module.exports.addMovie = async (movieId, data) => {
    await pool.query("INSERT INTO movies (movie_id, data) VALUES ($1, $2)", [movieId, data]);
}

module.exports.addMovieToWatchlist = async (login, movieId) => {
    const userResult = await pool.query("SELECT id FROM users WHERE login = $1", [login]);
    
    const userId = userResult.rows[0].id;
    //await pool.query("INSERT INTO watchlist (user_id, movie_id) VALUES ($1, $2)", [login, movieId]);
    await pool.query("INSERT INTO watchlist (user_id, movie_id, watched) VALUES ($1, $2, $3)", [userId, movieId, false]);
}

//GETING WATCHLIST - TO TEST
module.exports.getWatchlist = async (user_id) => {
    const result = await pool.query("SELECT m.data ->> 'title' AS title, m.data ->> 'release_date' AS release_date, m.data ->> 'poster_path' AS poster_path, m.data ->> 'vote_average' AS vote_average, m.data ->> 'overview' AS overview, cast_member ->> 'name' AS actor_name, cast_member ->> 'character' AS character_name, cast_member ->> 'profile_path' AS actor_profile FROM watchlist AS w JOIN movies AS m ON w.movie_id = m.movie_id, LATERAL jsonb_array_elements(m.data->'credits'->'cast') WITH ORDINALITY AS cast_member(cast_data, idx) WHERE w.user_id = $1 AND idx <= 10 ORDER BY m.movie_id, idx", [user_id]);
    return result.rows;
 }//select m.data from watchlist as w join movies as m on w.movie_id = m.movie_id where w.user_id = 4
//SELECT m.data ->> 'title' AS title, m.data ->> 'release_date' AS release_date, m.data ->> 'poster_path' AS poster_path, m.data ->> 'vote_average' AS vote_average, m.data ->> 'overview' AS overview, cast_member ->> 'name' AS actor_name, cast_member ->> 'character' AS character_name, cast_member ->> 'profile_path' AS actor_profile FROM watchlist AS w JOIN movies AS m ON w.movie_id = m.movie_id, LATERAL jsonb_array_elements(m.data->'credits'->'cast') WITH ORDINALITY AS cast_member(cast_data, idx) WHERE w.user_id = $1 AND idx <= 10 ORDER BY m.movie_id, idx;

