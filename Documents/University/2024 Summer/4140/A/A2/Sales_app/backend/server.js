const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');
const db = require('./dbConnection');

const app = express();
const PORT = 8888;

app.use(cors());
app.use(bodyParser.json());

// Use the routes defined in index.js
app.use('/api', indexRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;