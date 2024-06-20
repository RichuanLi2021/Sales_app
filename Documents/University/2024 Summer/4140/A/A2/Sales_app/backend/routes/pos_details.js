const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

// List PO details
router.get('/:poNo', (req, res) => {
  const poNo = req.params.poNo;
  db.query('CALL ListPODetails(?)', [poNo], (err, results) => {
    if (err) throw err;
    res.send({ po: results[0][0], lines: results[1] });
  });
});

module.exports = router;