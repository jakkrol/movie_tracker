const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require("./db");

const app = express();

dotenv.config();
//const port = process.env.PORT || 3000;
// CORS config
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

//Test postgree conn
app.get("/dbcheck", async(req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`The db name is: ${result.rows[0].current_database}`)
})

//obsługa błędu
app.use((req, res) => {
  res.status(404).send("Wystapil blad: 404");
});

//server Running
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
