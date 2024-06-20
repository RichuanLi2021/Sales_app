const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

// List POs
router.get('/', (req, res) => {
  db.query('SELECT * FROM POs007', (err, results) => {
    if (err) throw err;
    const pos = results;
    const poDetailsPromises = pos.map(po => {
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Lines007 WHERE poNo007 = ?', [po.poNo007], (err, lineResults) => {
          if (err) reject(err);
          po.lines = lineResults;
          resolve(po);
        });
      });
    });
    Promise.all(poDetailsPromises)
      .then(results => res.send(results))
      .catch(err => console.error(err));
  });
});

module.exports = router;