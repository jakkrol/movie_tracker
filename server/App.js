const express = require('express');
const cors = require('cors');

const app = express();

// 🔐 CORS config
const allowedOrigins = [
  'https://superfilmy.onrender.com',
  'http://localhost:3000'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

const port = process.env.PORT || 5000;

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  res.json({ username, password, isSucces: true });
});

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  res.send('zarejestrowano');
});

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.use((req, res) => {
  res.status(404).send("Wystapil blad: 404");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
