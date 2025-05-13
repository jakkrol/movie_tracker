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
app.get('/api/register', (req, res) => {
  res.send('zarejestrowano');
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});