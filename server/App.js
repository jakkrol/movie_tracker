const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
// Set the port
const port = 5000;


// Sample route
app.post('/api/login', (req, res) => {
  const {username, password} = req.body;
  console.log(username, password);
  res.json({username: username, password: password, isSucces: true})
  //res.send("Zalogowano" + username + " " + password);
});
app.post('/api/register', (req, res) => {
  const {username, password} = req.body;
  res.send('zarejestrowano');
})

app.use((req, res) => {
  res.status(404).send("Wystapil blad: 404");
} )

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});