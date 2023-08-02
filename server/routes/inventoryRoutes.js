const express = require('express');
const router = express.Router();

const inventoryController = require('../controllers/inventoryController');

router.get('/api/inventory', inventoryController.getAllItems);

module.exports = router;