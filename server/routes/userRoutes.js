const express = require('express');
const { userLogin, userRegister, addToWatchlist, getWatchlist } = require('../controllers/userController');
const verifyJWT = require('../middlewares/verifyJWT');

const router = express.Router();

router.post('/login', userLogin);

router.post('/register', userRegister);

router.post('/addMovie', verifyJWT, addToWatchlist);

router.get('/getWatchlist', verifyJWT, getWatchlist);

// router.post('/api/login', (req, res) => {
//   const { username, password } = req.body;
//   res.json({ username, password, isSucces: true });
// });

// router.post('/api/register', (req, res) => {
//   const { username, password } = req.body;
//   res.send('zarejestrowano');
// });

module.exports = router;