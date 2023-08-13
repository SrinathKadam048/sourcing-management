const express = require('express');
const router = express.Router();

const PR_Controller = require('../controllers/purchaseReqConroller')

router.post('/api/budget/addPR', PR_Controller.addPR);
router.get('/api/budget/getAllPRs', PR_Controller.getAllPRs)
router.put(`/api/budget/updatePR/:PR_ID`, PR_Controller.updatePR);

module.exports = router;