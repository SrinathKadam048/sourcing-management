const express = require('express');
const router = express.Router();

const budgetController = require('../controllers/budgetController');

router.get('/api/budget', budgetController.getBudget);
router.put(`/api/budget/updateBudget/:company`, budgetController.updateBudget);

module.exports = router;
