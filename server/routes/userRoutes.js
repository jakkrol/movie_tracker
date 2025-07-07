const express = require('express');
const { userLogin, userRegister, addToWatchlist, getWatchlist, updateWatchlist } = require('../controllers/userController');
const { handleRefreshToken } = require('../controllers/refreshTokenController');
const verifyJWT = require('../middlewares/verifyJWT');

const router = express.Router();

router.post('/login', userLogin);

router.post('/register', userRegister);

router.post('/addMovie', verifyJWT, addToWatchlist);

router.get('/getWatchlist', verifyJWT, getWatchlist);

router.post('/updateWatched', verifyJWT, updateWatchlist);

router.get('/refresh', handleRefreshToken);

router.get('/testRefresh', (req, res) => {
  console.log("Test działa");
  res.json({ message: "refresh router działa" });
});

// router.post('/api/login', (req, res) => {
//   const { username, password } = req.body;
//   res.json({ username, password, isSucces: true });
// });

// router.post('/api/register', (req, res) => {
//   const { username, password } = req.body;
//   res.send('zarejestrowano');
// });

module.exports = router;