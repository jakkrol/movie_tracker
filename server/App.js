const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const errorHandling = require('./middlewares/errorHandler')

const app = express();

dotenv.config();
const port = process.env.PORT || 5000;
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

app.use("/api", userRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

//Test postgree conn
app.get("/dbcheck", async(req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`The db name is: ${result.rows[0].current_database}`)
})

//error hanling
app.use(errorHandling);

//server running
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
