const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

// Validate Client
router.get('/validate-client/:clientID', (req, res) => {
  const clientID = req.params.clientID;
  db.query('SELECT COUNT(*) AS count FROM Clients007 WHERE clientID007 = ?', [clientID], (err, results) => {
    if (err) throw err;
    const isValid = results[0].count > 0;
    res.send({ isValid });
  });
});

module.exports = router;