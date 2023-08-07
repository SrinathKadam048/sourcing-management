const express = require('express');
const router = express.Router();

const inventoryController = require('../controllers/inventoryController');

router.get('/api/inventory', inventoryController.getAllItems);
router.get(`/api/inventory/checkItem/:itemId`, inventoryController.checkItem);
router.post('/api/inventory/addItem', inventoryController.addItem);

module.exports = router;