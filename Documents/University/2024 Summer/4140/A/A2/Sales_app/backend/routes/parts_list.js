const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

// List parts
router.get('/', (req, res) => {
  db.query('CALL ListParts()', (err, results) => {
    if (err) throw err;
    res.send(results[0]);
  });
});

module.exports = router;