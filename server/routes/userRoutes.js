const express = require('express');
const { userLogin, userRegister } = require('../controllers/userController');

const router = express.Router();

router.post('/login', userLogin);

router.post('/register', userRegister);

// router.post('/api/login', (req, res) => {
//   const { username, password } = req.body;
//   res.json({ username, password, isSucces: true });
// });

// router.post('/api/register', (req, res) => {
//   const { username, password } = req.body;
//   res.send('zarejestrowano');
// });

module.exports = router;