const pool = require("../config/db");

module.exports.userLoginService = async (login) => {
    const result = await pool.query("SELECT * FROM users WHERE login = $1", [login]);
    return result.rows[0];
}

module.exports.userRegisterService = async (login, password) => {
    const result = await pool.query("INSERT INTO users (login, password, created_at) VALUES ($1, $2, $3) RETURNING *", [login, password, Date.now()]);
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
  const result = await pool.query(`
    SELECT 
    w.watched AS watched,
    m.movie_id,
    m.data ->> 'title' AS title,
    m.data ->> 'genres' AS genres,
    m.data ->> 'release_date' AS release_date,
    m.data ->> 'poster_path' AS poster_path,
    m.data ->> 'vote_average' AS vote_average,
    m.data ->> 'overview' AS overview,
    jsonb_agg(jsonb_build_object(
        'name', cast_member.cast_data ->> 'name',
        'character', cast_member.cast_data ->> 'character',
        'profile_path', cast_member.cast_data ->> 'profile_path'
    ) ORDER BY cast_member.idx) FILTER (WHERE cast_member.idx <= 10) AS top_cast
    FROM 
    watchlist AS w
    JOIN 
    movies AS m ON w.movie_id = m.movie_id
    LEFT JOIN LATERAL 
    jsonb_array_elements(m.data->'credits'->'cast') WITH ORDINALITY AS cast_member(cast_data, idx)
    ON true
    WHERE 
    w.user_id = $1
    GROUP BY 
    w.watched, m.movie_id, m.data
    ORDER BY 
    m.movie_id;
  `, [user_id]);

  return result.rows;
};

module.exports.updateWatchlist = async (user_id, movies) => {
    //console.log("Updating watchlist for user:", user_id, "with movies:", movies);
    await pool.query('UPDATE watchlist SET watched = NOT watched WHERE user_id = $1 AND movie_id = ANY($2);', [user_id, movies.map(movie => movie.movie_id)]);
}

module.exports.deleteMoveFromWatchlist = async (user_id, movie_id) => {
    await pool.query('DELETE FROM watchlist WHERE user_id = $1 AND movie_id = $2;', [user_id, movie_id]);
}

module.exports.addReviewDb = async (movie_id, user_id, review) => {
    await pool.query('INSERT INTO reviews (movie_id, user_id, review) VALUES ($1, $2, $3);', [movie_id, user_id, review]);
}

module.exports.getReviewsForMovie = async (movie_id) => {
    const result = await pool.query('SELECT * FROM reviews WHERE movie_id = $1;', [movie_id]);
    return result.rows;
}

module.exports.getProfileData = async (username) => {
    const result = await pool.query('SELECT login, avatar_url, bio, created_at FROM users WHERE login = $1;', [username]);
    return result.rows[0];
}