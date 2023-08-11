const express = require('express');
const router = express.Router();

const budgetController = require('../controllers/budgetController');

router.get('/api/budget', budgetController.getBudget);

module.exports = router;
