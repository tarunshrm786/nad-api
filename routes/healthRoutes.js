// routes/healthRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ status: 'THE-NAD API is running' });
});

module.exports = router;
