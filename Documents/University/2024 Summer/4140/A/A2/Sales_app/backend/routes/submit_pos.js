const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

// Submit POs
router.post('/', (req, res) => {
  const { clientCompID007, dateOfPO007, lines } = req.body;

  console.log('Received payload:', req.body); // Debug log

  db.query('CALL InsertPurchaseOrder(?, ?, ?, ?)', [clientCompID007, dateOfPO007, 'Pending', JSON.stringify(lines)], (err, results) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      return res.status(400).send({ message: err.message });
    }

    console.log('Stored procedure results:', results); // Debug log

    if (results && results[0] && results[0][0]) {
      res.send({ poNo007: results[0][0].poNo007 });
    } else {
      console.error('Unexpected results structure:', results);
      res.status(500).send({ message: 'Unexpected results structure' });
    }
  });
});

module.exports = router;