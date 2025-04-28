const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

// Set the port
const port = 5000;


// Sample route
app.get('/api/login', (req, res) => {
  res.send('test');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});