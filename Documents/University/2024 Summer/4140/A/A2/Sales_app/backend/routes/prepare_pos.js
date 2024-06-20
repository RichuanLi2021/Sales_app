const express = require('express');
const router = express.Router();

// Prepare POs
router.post('/prepare-po-lines', (req, res) => {
  const { lines } = req.body;
  res.send({ message: 'PO lines prepared successfully', lines });
});

module.exports = router;